const mysql = require('mysql')
const express = require('express')
const router = express.Router()
const modules = require("../db")
const passport = require('passport')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const bcrypt = require('bcrypt')
const tobcrypt = require('./package/bcrypt')
const toupdate = require('./package/update')

const con = mysql.createConnection(modules.mysql)
require('dotenv').config()

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        cb(null, './client/public/static')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片拼接上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);

    }
});
var upload = multer({
    storage: storage
});

//上传商品图片
router.post('/upload', upload.single('pic'), (req, res) => {
    let pic = req.file
        // console.log(req.body)
    con.query('insert into shoplist(name,price,goodspic,picname,status,quantity) values(?,?,?,?,?,?)', [req.body.name, req.body.price, pic.path, pic.filename, 1, req.body.quantity], (err, result) => {
        if (err) throw err
        if (result) {
            res.status(200).json({ src: pic.path, filename: pic.filename });
        }
    })
})


//管理员登录
router.post('/adminlogin', (req, res) => {
    con.query('select * from admins where adminname=?', req.body.adminname, (err, data) => {
        if (err) throw err
        if (data[0] != undefined) {
            // bcrypt.compare('111111', data[0].pwd, (err, isMatch) => {
            //         console.log(isMatch)
            //     })
            bcrypt.compare(req.body.pwd, data[0].pwd, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        const rule = {
                            id: data[0].id,
                            name: data[0].adminname,
                            identity: data[0].identity
                        }
                        if (data[0].accountStatus == -1) {
                            return res.status(400).json('账号已被冻结！')
                        } else {
                            jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err
                                return res.status(200).json({
                                    success: true,
                                    token: "Bearer " + token,
                                    identity: data[0].identity
                                })
                            })
                        }
                    } else {
                        return res.status(400).json('密码或账号错误，请重新输入');
                    }
                })
                // const rule = {
                //     id: data[0].id,
                //     name: data[0].adminname,
                //     identity: data[0].identity
                // }
                // jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                //     return res.status(200).json({
                //         success: true,
                //         token: "Bearer " + token,
                //         identity: data[0].identity
                //     })
                // })
        } else {
            return res.status(400).json('不存在该账号!');

        }
    })
})

//修改商品信息
router.post('/updateshoplist', passport.authenticate('jwt', { session: false }), (req, res) => {
        const param = req.body;
        con.query('update shoplist set name=?,price=?,picname=?,quantity=? where id=?', [param.name, param.price, param.goodspicname, param.quantity, param.id], (err, result) => {
            if (err) throw err;
            if (result.changedRows != 0) {
                return res.status(200).send("修改成功啦!")
            }
        })
    })
    //兑换商品
router.post('/exchangeGoods', passport.authenticate('jwt', { session: false }), (req, res) => {
        const param = req.body;
        const value = [-1, param.name, param.code];
        const string = "update exchangeinfo set status=? where username=? and randomcode=? and status=-1"
        toupdate.updateOption(string, value)
            .then(r => {
                if (r.status == 200) {
                    return res.json({ status: 200, code: 'ok' });
                }
            }).catch(r => {
                return res.status(400).json('兑换失败，请重试');

            })

    })
    //获取用户列表
router.get('/getuserlist', passport.authenticate('jwt', { session: false }), (req, res) => {
    // select *from user2 a inner join users_table b on a.username=b.username group by a.username
    con.query('select * from user_info', (err, result) => {
        if (err) throw err;
        if (result != undefined) {
            return res.status(200).json(result);
        } else {
            return res.status(201).json(result);
        }
    })
})

//获取管理员列表
router.get('/getadminlist', passport.authenticate('jwt', { session: false }), (req, res) => {
        // select *from user2 a inner join users_table b on a.username=b.username group by a.username
        con.query("select id,adminname,time,accountStatus from admins where identity='管理员'", (err, result) => {
            if (err) throw err;
            if (result != undefined) {
                return res.status(200).json(result);
            } else {
                return res.status(201).json(result);
            }
        })
    })
    //新增管理员
router.post('/toAddAdmin', passport.authenticate('jwt', { session: false }), (req, res) => {
        const param = req.body;
        let pwd = '';
        con.query(`select adminname from admins where adminname='${param.adminname}' `, (err, result) => {
            if (err) throw err
            if (result[0]) {
                return res.status(400).json('改账号已存在,请重新输入')
            } else {
                for (let i = 0; i < 6; i++) {
                    pwd = pwd + Math.floor(Math.random() * 10)
                }
                tobcrypt.toBcrypt(pwd).then(r => {
                    let newpwd = r;
                    console.log(newpwd)
                        // bcrypt.compare('111111', newpwd, (err, isMatch) => {
                        //     console.log(isMatch)
                        // })
                    con.query('insert into admins(adminname,pwd,identity,time,accountStatus) values(?,?,?,?,?)', [param.adminname, newpwd, param.identity, param.time, param.status ? 1 : -1], (err, result) => {
                        if (err) throw err
                        if (result.affectedRows > 0) {
                            return res.status(200).json({ adminname: param.adminname, pwd: pwd })
                        } else {
                            return res.status(400).json('添加管理员账号失败,请重试')
                        }
                        // $2b$10$.wOnsAxjyxzLr6URNj5cn.Lhrk..5oaChIZ7Y5a.3jaWab4sW7uH6
                    })
                })
            }
        })
    })
    //重置用户密码
router.post('/resetUserpwd', passport.authenticate('jwt', { session: false }), (req, res) => {
        console.log(req.body.username);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('111111', salt, function(err, hash) {
                if (err) throw err
                let pwd = hash
                con.query('update user2 set password=? where username=?', [pwd, req.body.username], (err, result) => {
                    if (err) throw err;
                    if (result != undefined) {
                        return res.status(200).json(result);
                    } else {
                        return res.status(201).json(result);
                    }
                })
            })
        })
    })
    //显示新闻的详细内容
router.get('/news/newstoshow/:id', (req, res) => {
        con.query('select *from notice where id=?', req.params.id, (err, data) => {
            if (err) throw err
            if (data !== undefined) {
                res.send(data[0]);
            }
        })
    })
    //删除商品信息（软删除）
router.post('/deleteOne', passport.authenticate('jwt', { session: false }), (req, res) => {
        const status = 0;
        con.query('update shoplist set status=? where id=?', [status, req.body.id], (err, data) => {
            if (err) throw err
            if (data !== undefined) {
                return res.status(200).json();
            }
        })
    })
    // router.get('/newstoshow', (req, res) => {
    //     con.query('select *from notice where id=?', req.params.id, (err, result) => {
    //         if (err) throw err
    //         if (result !== undefined) {
    //             res.send(result)
    //         } else {
    //             res.send('无内容！')
    //         }
    //     })
    // })

//发布新闻
router.post('/publishContent', passport.authenticate('jwt', { session: false }), (req, res) => {
        const param = req.body;
        const status = 1;
        // con.query('select *from notice where id=?', 1, (err, data) => {
        //         if (err) throw err
        //         if (data !== undefined) {
        //             res.send(data[0]);
        //         }
        //     })
        con.query('insert into notice(title,content,author,time,type,status,manager) values(?,?,?,?,?,?,?)', [param.name, param.content, param.author, param.time, param.newstype, status, param.manager], (err, result) => {
            if (err) throw err
            if (result.affectedRows > 0) {
                return res.status(200).json('发布成功');
            } else {
                return res.status(400).json('发布失败');
            }
        })
    })
    //超级管理员冻结管理员账号
router.post('/freezeOperation', passport.authenticate('jwt', { session: false }), (req, res) => {
    const param = req.body;
    param.accountStatus = param.accountStatus ? -1 : 1;
    con.query(`update admins set accountStatus='${param.accountStatus}' where adminname='${param.adminname}'`, (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) {
            return res.status(200).json()
        } else {
            return res.status(400).json('操作失败，请稍后再试！')
        }
    })
})
module.exports = router