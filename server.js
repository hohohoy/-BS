const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const passport = require('passport')
    //引入users.js
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const visitor = require('./routes/api/visitor')
const admin = require('./routes/api/admin')

// var http = require('http');
// var optfile = require('./fs_read');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //初始化passport
app.use(passport.initialize())
require('./config/passport')(passport)
    // require('./config/passport2')(passport)

//使用routes
app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/visitor", visitor)
app.use("/api/admin", admin)
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
        code: 500,
        msg: err.message,
        error: err.stack,
        timestamp: Date.now()
    });
});

const port = process.env.port || 5000
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
})