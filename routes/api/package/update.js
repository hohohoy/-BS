const mysql = require('mysql')
const modules = require("../../db")
const con = mysql.createConnection(modules.mysql)
module.exports = {
    updateOption(str, val) {
        return new Promise((res, rej) => {
            con.query(str, val, (err, result) => {
                if (err) throw err
                if (result.affectedRows > 0) {
                    res({ status: 200, code: 'ok' })
                } else {
                    rej({ status: 400, code: 'failed' })
                }
            })
        })
    }
}