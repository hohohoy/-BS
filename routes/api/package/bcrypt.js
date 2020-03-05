const bcrypt = require('bcrypt')

module.exports.toBcrypt = function(pre) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(pre, salt, function(err, hash) {
                resolve(hash)
            })
        })
    })
}