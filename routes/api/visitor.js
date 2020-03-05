const mysql = require('mysql')
const express = require('express')
const router = express.Router()
const modules = require("../db")
const passport = require('passport')

const con = mysql.createConnection(modules.mysql)

//获取新闻列表
router.get('/showNews', (req, res) => {
    con.query('select *from notice where status=1 order by time desc', (err, data) => {
        if (err) throw err
        if (data !== undefined) {
            res.send(data);
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
router.get('/newstoshow/:id', (req, res) => {
        con.query('select *from notice where id=?', req.params.id, (err, data) => {
            if (err) throw err
            if (data !== undefined) {
                res.send(data);
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
module.exports = router