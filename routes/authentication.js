var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');
var {User} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    if (req.body.type == 'service') {
        Service.find({ email: req.body.email }).then(info => {
            if (info[0].password == req.body.password) {
                res.send(JSON.stringify({
                    authentication: true, 
                    information: {
                        name: info[0].user,
                        email: info[0].email,
                        password: info[0].password,
                        type: info[0].type,
                        phoneNumber: info[0].phoneNumber,
                        age: info[0].age,
                        medicalConditions: info[0].medicalConditions,
                        otherDetails: info[0].otherDetails
                    }
                }));
            } else {
                res.send(JSON.stringify({authentication: false, information: null}));
            }
        }).catch(err => {
            res.send("Service is not in database")
        })
    }
    else if (req.body.type == 'user') {
        User.find({ email: req.body.email }).then(info => {
            if (info[0].password == req.body.password) {
                res.send(JSON.stringify({
                    authentication: true, 
                    information: {
                        name: info[0].user,
                        email: info[0].email,
                        password: info[0].password,
                        type: info[0].type,
                        address: info[0].address,
                    }
                }));
            } else {
                res.send(JSON.stringify({authentication: false, information: null}));
            }
        }).catch(err => {
            res.send("User is not in database")
        })
    }
})

module.exports = router;