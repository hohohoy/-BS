const mysql = require('mysql')
const express = require('express')
const router = express.Router()
const modules = require("../db")
const passport = require('passport')
const fs = require("fs")

var con = mysql.createConnection(modules.mysql)
    // router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    //         const params = req.body
    //         con.query('insert into inf2(name,content,price) values(?,?,?)', [params.name, params.content, params.price], (err, result) => {
    //             if (err) throw err
    //             if (result) {
    //                 //console.log(result[0])
    //                 res.send(result)
    //             }
    //         })
    //     })
    //显示公告类型的新闻
router.get('/showNotice', passport.authenticate('jwt', { session: false }), (req, res) => {
        con.query('select *from notice where type=? order by time desc', '公告', (err, result) => {
            if (err) throw err
            if (result !== undefined) {
                res.send(result)
            } else {
                res.send('无内容！')
            }
        })
    })
    //按时间先后顺序显示所有新闻（不需要身份验证）
router.get('/shownews', (req, res) => {
        con.query('select id,title,content,author,time,type,manager from notice where status=1 order by time desc', (err, result) => {
            if (err) throw err
            if (result !== undefined) {
                return res.status(200).json(result);
            } else {
                return res.status(201).json('无内容！')
            }
        })
    })
    //修改新闻
router.post('/editNews', passport.authenticate('jwt', { session: false }), (req, res) => {
        const params = req.body
        con.query('update notice set title=?,content=?,author=?,time=?,manager=? where id=?', [params.title, params.content, params.author, params.time, params.manager, params.id], (err, result) => {
            if (err) throw err
            if (result) {
                return res.status(200).send(result)
            } else {
                res.status(201).send('修改失败 ')
            }
        })
    })
    //删除新闻（软删除）
router.post('/deleteNews', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.id)
    const newsStatus = 0;
    con.query('update notice set status=? where id=?', [newsStatus, req.body.id], (err, result) => {
        if (err) throw err
        if (result) {
            return res.status(200).send(result)
        } else {
            return res.status(201).send('删除失败 ')
        }
    })
})

// router.get('/showNotice', passport.authenticate('jwt', { session: false }), (req, res) => {
//     con.query('select *from notice', (err, data) => {
//         if (err) throw err;
//         if (data !== undefined) {
//             res.send(data);
//         }
//     })
// })

//获取商品列表
router.get('/showshoplist', passport.authenticate('jwt', { session: false }), (req, res) => {
        con.query('select *from shoplist where status=1 order by id desc', (err, data) => {
            if (err) throw err;
            if (data !== undefined) {
                res.send(data);
            }
        })
    })
    //获取用户信息
router.get('/userinfo/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
        con.query('select *from userinfo where username=?', req.params.username, (err, data) => {
            if (err) throw err;
            res.send(data[0])
        })
    })
    //获取用户兑换信息
router.get('/myexchangelist/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
    con.query('select *from exchangeinfo where username=?', req.params.username, (err, data) => {
        if (err) throw err;
        return res.json(data)
    })
})

router.get('/shopimg/*', (req, res) => {
    // res.writeHead(200, { "Content-Type": "image/jpeg" });
    // if (res.url !== "/favicon.ico") {
    //     readimg.readImage('./test.png', res)
    // }

    console.log(req.url)
    let file_path = __dirname + "/" + "/img2/ng.jpg";

    fs.readFile(file_path, 'binary', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            // console.log("输出文件");
            //不加这句，页面可能会乱码，图片包含中文也会乱码
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            })
            res.write(data, 'binary');
            res.end()
        }
    })
})

module.exports = router