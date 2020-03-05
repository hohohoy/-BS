const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql')
const modules = require("../routes/db")
const keys = require('../config/keys')
const con = mysql.createConnection(modules.mysql)
con.connect()
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        if (jwt_payload.identity != undefined) {
            // if (jwt_payload.identity.indexOf("管理员")) {
            con.query('SELECT * from admins where id = ?', jwt_payload.id, (err, result) => {
                    if (err) throw err
                    if (result[0] !== undefined) {
                        // console.log(result[0].pwd)
                        // const user = result
                        return done(null, result[0])
                    } else
                        return done(null, false)
                })
                // }


        } else {
            con.query('SELECT * from user2 where id = ?', jwt_payload.id, (err, result) => {
                if (err) throw err
                if (result[0] !== undefined) {
                    // console.log(result)
                    // const user = result
                    return done(null, result[0])
                } else
                    return done(null, false)
            })
        }

    }));
}