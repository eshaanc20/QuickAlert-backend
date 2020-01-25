var express = require('express');
var router = express.Router();
var {Hospital} = require('../db/mongoose');
var {User} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    if (req.body.type == 'hospital') {
        Hospital.find({ email: req.body.email }).then(info => {
            res.send(req.body.password)
            if (info.password == req.body.password) {
                res.send(true);
            } else {
                res.send(false);
            }
        }).catch(err => {
            res.send("Hospital not in database")
        })
    }
    else if (req.body.type == 'user') {
        User.find({ email: req.body.email }).then(info => {
            res.send(info.password)
            // if (info.password == req.body.password) {
            //     res.send(true);
            // } else {
            //     res.send(false);
            // }
        }).catch(err => {
            res.send("User not in database")
        })
    }
})

module.exports = router;