var express = require('express');
var router = express.router();
var {User} = require('../db/mongoose')

router.get('/', (req, res, next) => {
    User.updateOne({name: req.body.email}, {
        ...req.body
    }).then(() => {
        res.send('Database updated')
    })
    res.send('testing')
});

module.exports = router;