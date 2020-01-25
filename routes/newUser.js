var express = require('express');
var router = express.Router();
var {User} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    const userInfo = {
        ...req.body
    };
    const newUser = new User(userInfo);
    newUser.save().then(() => {
        res.send("New user registered");
    }).catch(err => {
        res.send("New user was not registered");
    })
})

module.exports = router;