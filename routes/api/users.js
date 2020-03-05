//login & register
const mysql = require('mysql')
const express = require('express')
const router = express.Router()
const modules = require("../db")
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const app = express()
const gravatar = require('gravatar')
const nodemailer = require('nodemailer')
const keys = require('../../config/keys')
    // import { tobcrypt } from './package/bcrypt'
const tobcrypt = require('./package/bcrypt')
const toupdate = require('./package/update')
const multer = require('multer')
require('dotenv').config()
    // var storage = multer.diskStorage({
    //     //设置上传后文件路径，uploads文件夹会自动创建。
    //     destination: function(req, file, cb) {
    //         cb(null, './client/static')
    //     },
    //     //给上传文件重命名，获取添加后缀名
    //     filename: function(req, file, cb) {
    //         var fileFormat = (file.originalname).split(".");
    //         //给图片加上时间戳格式防止重名名
    //         //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
    //         cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);

//     }
// });
// var upload = multer({
//     storage: storage
// });

// router.post('/upload', upload.single('pic'), (req, res) => {
//     let pic = req.file
//     console.log(req.body)
//         // console.log(req.body)
//         // if (pic) {
//         // fs.unlink(pic.path, (e) => {
//         //     if (e) {
//         //         console.log('文件操作失败')
//         //         throw e;
//         //     } else
//         //         console.log('文件:' + pic.path + '删除成功！');
//         // });
//         // }
//         // res.status(200).send('上传成功');
//         // const path = "" + pic.path;
//     con.query('insert into shoplist(name,price,goodspic,picname) values(?,?,?,?)', [req.body.name, req.body.price, pic.path, pic.filename], (err, result) => {
//         if (err) throw err
//             // if (result) {
//         res.status(200).json({ src: pic.path, filename: pic.filename });

//         // }
//     })
// })
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const con = mysql.createConnection(modules.mysql)
    //用户注册
router.post('/register', (req, res) => {
        const params = req.body;
        let paypwd, pwd;
        con.query('select *from user2 where username=? or email=?', [params.username, params.email], (err, result) => {
            if (err) throw err
            if (result[0] === undefined) {
                const avatar = gravatar.url(params.email, { s: '200', r: 'pg', d: 'mm' });
                const user = {
                        name: params.username,
                        password: params.password,
                        avatar: avatar,
                        points: 200
                    }
                    //进行密码加密
                Promise.all([
                        tobcrypt.toBcrypt(params.payPWD),
                        tobcrypt.toBcrypt(params.password)
                    ]).then(r => {
                        paypwd = r[0];
                        pwd = r[1];
                        con.query('insert into user2(username,password,email,paypwd) values(?,?,?,?)', [params.username, pwd, params.email, paypwd], (err, result) => {
                            if (err) throw err
                            if (result) {
                                con.query('insert into users_table(username,email,sex,birthday,phone,detail) values(?,?,?,?,?,?)', [params.username, params.email, '男', '', '', ''])
                                if (err) throw err
                                if (result) {
                                    let cardid = '10101010';
                                    for (var i = 0; i < 8; i++) {
                                        cardid += Math.floor(Math.random() * 10);
                                    }
                                    con.query('insert into userinfo(username,points,historyPoints,cardid) values(?,?,?,?)', [params.username, user.points, user.points, cardid], (err, result2) => {
                                        if (err) throw err
                                        if (result2) {
                                            let timeStamp = new Date();
                                            let time = (timeStamp.getTime());
                                            con.query('insert into cardinfo(username,cardid,time,status) values(?,?,?,?)', [params.username, cardid, time, -1], (err, result) => {
                                                return res.status(200).json('注册成功！');
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    })
                    // new Promise((resolve, reject) => {
                    //     newpwd = tobcrypt.toBcrypt(params.payPWD)
                    //     if (newpwd) {
                    //         resolve(newpwd)
                    //     } else {
                    //         console.log('undefinedddd')
                    //     }
                    // }).then(res => {
                    //     console.log(value)
                    // }), err => {
                    //     console.log(err)
                    // }
                    // bcrypt.genSalt(10, (err, salt) => {
                    //     bcrypt.hash(params.password, salt, function(err, hash) {
                    //         if (err) throw err
                    //         params.password = hash
                    //             // let newpayPWD = tobcrypt.toBcrypt(params.payPWD);
                    //             // console.log(newpayPWD)

                //         // setTimeout(() => {
                //         //     console.log(':::' + newpayPWD)
                //         // }, 3000)


                //     });
                // });
            } else {
                return res.status(400).json('账号或邮箱已存在，请重新输入');
            }
        })
    })
    //用户登录
router.post('/login', (req, res) => {
        const params = req.body
            // con.format(params.username)
        con.query('select *from user2 where username=?', params.username, (err, result) => {
            if (err) throw err
            if (result[0] !== undefined) {
                bcrypt.compare(params.password, result[0].password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        const avatar = gravatar.url(result[0].email, { s: '200', r: 'pg', d: 'mm' });
                        const rule = {
                                id: result[0].id,
                                name: result[0].username,
                                email: result[0].email,
                                avatar: avatar
                            }
                            //jwt.sign("规则","加密名字","过期时间","箭头函数")
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            res.status(200).json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        return res.status(201).json('密码错误，请重新输入!');
                    }
                })
            } else {
                return res.status(202).json('不存在该用户，请重新输入!');
            }
        })
    })
    //验证用户支付密码是否正确,正确则进行充值
router.post('/torecharge', passport.authenticate('jwt', { session: false }), (req, res) => {
        const param = req.body;
        console.log(param)
            //  and paypwd?
        con.query('select paypwd from user2 where username=?', [param.username, param.paypwd], (err, result) => {
            if (err) throw err;
            if (result[0]) {
                bcrypt.compare(param.paypwd, result[0].paypwd, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        let string1 = "UPDATE cardinfo AS A INNER JOIN (SELECT balance,username FROM cardinfo WHERE username=?) AS B ON A.username=B.username SET A.balance=A.balance+?";
                        let value1 = [param.username, param.money];
                        let string2 = "UPDATE userinfo AS A INNER JOIN (SELECT * FROM cardinfo WHERE username=?) AS B ON A.username=B.username SET A.points=A.points+?,A.historyPoints=A.historyPoints+?";
                        let value2 = [param.username, param.money, param.money];
                        Promise.all([
                                toupdate.updateOption(string1, value1),
                                toupdate.updateOption(string2, value2)
                            ])
                            // toupdate.updateOption(string, value)
                            .then(r => {
                                let last1 = r[0];
                                let last2 = r[1];
                                if (last1.status == 200 && last2.status == 200) {
                                    con.query('insert into recharge_table(username,cardid,money,time) values(?,?,?,?)', [param.username, param.cardid, param.money, param.time], (err, result) => {
                                        if (err) throw err;
                                        if (result) {
                                            console.log(result)
                                            return res.json({ status: 200, code: 'ok' });
                                        }
                                    })
                                }
                            }).catch(r => {
                                return res.status(400).json('充值失败，请重试');
                            })
                            // con.query("UPDATE cardinfo AS A INNER JOIN (SELECT balance,username FROM cardinfo WHERE username=?) AS B ON A.username=B.username SET A.balance=A.balance+?", [param.username, param.money], (err, result) => {
                            //     if (err) throw err
                            //     if (result.affectedRows > 0) {
                            //         con.query(`UPDATE userinfo AS A INNER JOIN (SELECT * FROM cardinfo WHERE username='${param.username}') AS B ON A.username=B.username SET A.points=A.points+${param.money},A.historyPoints=A.historyPoints+${param.money}`, (err, result) => {
                            //             if (err) throw err;
                            //             if (result.affectedRows > 0) {
                            //                 return res.status(200).json();
                            //             } else {
                            //                 return res.status(400).json('充值失败，请重试')
                            //             }
                            //         })
                            //     } else {
                            //         return res.status(400).json('充值失败，请重试')
                            //     }
                            // })
                    } else {
                        return res.status(400).json('支付密码错误，请重新输入')
                    }
                })
            }
        })
    })
    //用户充值记录查询 
router.post('/getRechargeList', (req, res) => {
        const param = req.body;
        con.query('select * from recharge_table where cardid= (select cardid from cardinfo where username=?) order by time desc', param.username, (err, result) => {
            if (err) throw err
            if (result) {
                console.log(result)
                return res.status(200).json(result);
            }
        })
    })
    //用户修改密码
router.post('/updatePWD', (req, res) => {
        const param = req.body
        con.query('select *from user2 where username=?', param.username, (err, result) => {
            if (err) throw err
            bcrypt.compare(param.oldpwd, result[0].password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(param.newpwd2, salt, function(err, hash) {
                            if (err) throw err
                            param.newpwd2 = hash
                            con.query("update user2 set password=? where username=?", [param.newpwd2, param.username], (err, result) => {
                                if (err) throw err
                                if (result.changedRows != 0)
                                    res.send("修改密码成功!!!")
                            })
                        })
                    })
                } else {
                    return res.status(400).json('密码错误，请重新输入!');
                }
            })


        })
    })
    //     //用户修改绑定邮箱
    // router.post('/updateEmail', (req, res) => {
    //         const param = req.body
    //         con.query('select *from changemailinf where code=?', param.code, (err, result) => {
    //             if (err) throw err
    //             if (result[0] != undefined) {
    //                 res.status(200).json()
    //             } else {
    //                 res.status(401).json('验证码错误，请重新输入')
    //             }


//         })
//     })
//忘记密码操作
router.post('/retrievePWD', (req, res) => {
    const param = req.body;
    con.query('select * from user2 where username=?', param.username, (err, result) => {
        if (err) throw err
        if (result[0].username === undefined) {
            res.status(400).json({
                state: 'failed',
                msg: "该用户不存在"
            })
        } else {
            let transporter = nodemailer.createTransport({
                service: "qq",
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            let thiscode = '';
            for (var i = 0; i < 6; i++) {
                thiscode += Math.floor(Math.random() * 10);
            }
            console.log(thiscode);
            let codeOpations = {
                    from: "2338757546@qq.com",
                    to: param.email,
                    // cc 抄送  bcc 秘密发送
                    subject: "找回密码提示",
                    text: `您的用户名是:${result[0].username},重置密码是:${thiscode}`
                }
                // transporter.sendMail(codeOpations, (err, data) => {
                //         if (err) throw err;
                //         console.log(data);
                //     })
                // let mailOpations = {
                //     from: "1225684596@qq.com",
                //     to: param.email,
                //     // cc 抄送  bcc 秘密发送
                //     subject: "找回密码提示",
                //     text: `您的用户名是:${result[0].username},重置密码是:123456`
                // }
                //将重置的密码加密后存入数据库
            transporter.sendMail(codeOpations, (err, data) => {
                // console.log(data);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(thiscode, salt, (err, hash) => {
                        if (err) throw err
                        const password = hash
                            // console.log(password)
                        con.query("update user2 set password=? where username=?", [password, param.username], (err, result) => {
                            if (err) throw err
                                // console.log(result)
                        })
                    });
                });
                // if (err) {
                //     res.status(400).json({
                //         state: "failed",
                //         msg: err
                //     })
                // } else {
                //     res.status(200).json({
                //         state: "suc",
                //         msg: `密码已发送至您的邮箱${param.email}`
                //     })

                // }

            })

        }
        res.send(result)
    })
})

//兑换商品
router.post('/exchange', passport.authenticate('jwt', { session: false }), (req, res) => {
    const points = req.body.points;
    con.query('select * from userinfo where username=?', req.body.username, (err, data) => {
        if (err) throw err;
        // const value = {
        //     username: req.body.username,
        //     points: result.points

        // };
        //判断积分数目是否可以兑换
        if (data[0].points < points) {
            res.status(400).json('积分不足,无法兑换')
        } else {
            //积分足够，产生随机兑换码存储到数据库
            let randomString = '';
            for (var i = 0; i < 4; i++) {
                const randomNumber = Math.floor(Math.random() * 10);
                // console.log(randomNumber);
                randomString += randomNumber;
            }
            if (randomString != '') {
                const goodsStatus = -1;
                //修改积分
                con.query('update shoplist set quantity=? where id=?', [req.body.number - 1, req.body.id], (err, result) => {
                    if (err) throw err
                    if (result.changedRows != 0) {
                        con.query('update userinfo set points=? where username=?', [data[0].points - points, req.body.username], (err, upResult) => {
                            if (err) throw err;
                            if (upResult) {
                                //新增兑换码
                                console.log(req.body.time)
                                con.query('insert into exchangeinfo(username,goodsid,randomcode,status,picname,goodsname,time) values(?,?,?,?,?,?,?)', [req.body.username, req.body.id, randomString, goodsStatus, req.body.picname, req.body.goodsname, req.body.time], (err, result) => {
                                    if (err) throw err;
                                    if (result) {
                                        // console.log(result)
                                        // res.send(result);
                                        res.status(200).json({ affectedRows: result.affectedRows, randomCode: randomString, newPoints: data[0].points - points });
                                    }
                                })
                            }
                        })
                    } else {
                        res.status(400).json("兑换失败，请稍后再试")
                    }
                })

            }
            // console.log(randomString);
            // res.status(200).json(data[0]);

            // const randomNumber = Math.floor(Math.random() * 10);
            // console.log(randomNumber);
            // res.status(200).json(result[0]);
        }
        // console.log(result[0].points)
    })
})

//更改绑定邮箱
router.post('/changeEmail', passport.authenticate('jwt', { session: false }), (req, res) => {
    const reqip = req.ip;
    // console.log(req.connection.remoteAddress)
    const param = req.body;
    var isSend;
    var newcode = '';
    con.query('select time from changemailinf where username=? and status=?', [param.username, -1], (err, result) => {
        if (err) throw err;
        // console.log(result[0])
        if (result[0] != undefined) {
            isSend = param.time - result[0].time > 60000 ? true : false;
        }
        if (isSend || result[0] == undefined) {
            con.query('select * from user2 where email=?', param.newEmail, (err, result) => {
                if (err) throw err
                if (result[0]) {
                    return res.status(400).json('邮箱已被绑定，请重新输入');
                } else {
                    // res.json('ok')
                    let transporter = nodemailer.createTransport({
                        service: "qq",
                        secure: true,
                        auth: {
                            user: process.env.EMAIL,
                            pass: process.env.PASSWORD
                        }
                    })
                    for (var i = 0; i < 4; i++) {
                        newcode += Math.floor(Math.random() * 10);
                    }
                    // console.log(newcode);
                    let emailcodeOpations = {
                        from: "2338757546@qq.com",
                        to: param.email,
                        // cc 抄送  bcc 秘密发送
                        subject: "修改绑定邮箱提示",
                        text: `您的加油站网上营业厅账号正在修改邮箱,验证码是:${newcode}（若不是你本人操作，请忽略）`
                    }
                    transporter.sendMail(emailcodeOpations, (err, sendres) => {
                        // con.query('insert into user2(username,password,email) values(?,?,?)', [params.username, params.password, params.email], (err, result) => {
                        const status = -1;
                        console.log(param.time)
                        console.log(isSend)
                        if (result[0] == undefined) {
                            con.query('insert into changemailinf(username,email,code,status,time,newemail) values(?,?,?,?,?,?)', [param.username, param.email, newcode, status, param.time, param.newEmail], (err, result2) => {
                                if (err) throw err;
                                return res.status(200).json({ status: 'ok', code: newcode })

                            })
                        } else {
                            con.query('update changemailinf set code=? and time=? where username=?', [newcode, param.time, param.username], (err, result2) => {
                                if (err) throw err;
                                return res.status(200).json({ status: 'ok', code: newcode })

                            })
                        }

                        // if (err) {
                        //     throw err;
                        // } else {

                        // }
                    })
                }

            })
        } else {
            res.status(201).json({ status: 'failed' })
        }

        // } else {
        //     res.status(201).json();
        // }
    })

})

//获取用户基本信息
router.get('/showusers_detail/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
        con.query('select * from users_table where username=?', req.params.username, (err, result) => {
            if (err) throw err;
            if (result[0]) {
                res.json(result[0]);
            }
        })
    })
    //修改用户基本信息
router.post('/alterinf', passport.authenticate('jwt', { session: false }), (req, res) => {
    const param = req.body;
    console.log(param)
    let ischangEmail; //是否修改邮箱
    if (param.email == param.newemail) {
        ischangEmail = 1;
    }
    con.query('select code,email,username,status from changemailinf where code=? and username=? and status=? and newemail=?', [param.code, param.username, -1, param.newemail], (err, result) => {
        if (err) throw err
        if (result[0] != undefined || ischangEmail) {
            con.query('update users_table set email=?,sex=?,birthday=?,phone=?,detail=? where username=?', [param.newemail, param.sex, param.birthday, param.phone, param.detail, param.username], (err, result) => {
                if (err) throw err;
                console.log(result.changedRows)
                if (result.changedRows > 0 && ischangEmail != 1) {
                    con.query('update user2 set email=? where username=?', [param.newemail, param.username], (err, result) => {
                        if (err) throw err;
                        console.log(result.changedRows)
                        if (result.changedRows > 0) {
                            let status = 1;
                            con.query('update changemailinf set status=? where username=?', [status, param.username], (err, result) => {
                                if (err) throw err
                                if (result.changedRows != 0) {
                                    return res.status(200).json({ status: 'ok' })
                                } else {
                                    return res.status(400).json({ status: 'failed' })
                                }
                            })
                        } else {
                            return res.status(400).json({ status: 'failed' })
                        }
                    })

                } else {
                    return res.status(200).json({ status: 'ok' })
                }
                // if (ischangEmail) {
                //     return res.status(200).json({ status: 'ok' })
                // } else {
                //     return res.status(400).json("修改失败，请稍后再试")
                // }
            })
        } else {
            res.status(400).json('验证码错误或过期（或填写的邮箱不一致），请重新输入')
        }
    })

})
router.get('/news/newstoshow/:id', (req, res) => {
    con.query('select *from notice where id=?', req.params.id, (err, data) => {
        if (err) throw err
        if (data !== undefined) {
            res.send(data[0]);
        }
    })
})

//获取卡信息
router.post('/getcardinfo', passport.authenticate('jwt', { session: false }), (req, res) => {
    con.query('select * from cardinfo where username=?', req.body.username, (err, result) => {
        if (err) throw err;
        if (result) {
            return res.json(result);
        }
    })
})
module.exports = router;