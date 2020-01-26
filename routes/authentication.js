var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {User} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    if (req.body.type == 'service') {
        Service.find({ email: req.body.email }).then(info => {
            if (info[0].password == req.body.password) {
                res.send([true, info[0].name, info[0].type]);
            } else {
                res.send([true, info[0].name, info[0].type]);
            }
        }).catch(err => {
            res.send("Service is not in database")
        })
    }
    else if (req.body.type == 'user') {
        User.find({ email: req.body.email }).then(info => {
            if (info[0].password == req.body.password) {
                res.send([true, info[0].name, 'user']);
            } else {
                res.send([false, info[0].name, 'user']);
            }
        }).catch(err => {
            res.send("User is not in database")
        })
    }
})

module.exports = router;