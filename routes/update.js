var express = require('express');
var router = express.router();
var {User} = require('../db/mongoose')

router.post('/', (req, res, next) => {
    User.updateOne({name: req.body.email}, {
        ...req.body
    }).then(() => {
        res.send('Database updated')
    }).catch((err) => {
        res.send('Error')
    })
});

module.exports = router;