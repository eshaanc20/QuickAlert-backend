var express = require('express');
var router = express.Router();
var {User} = require('../db/mongoose')

router.post('/', (req, res, next) => {
    User.updateOne({name: req.body.email}, {
        ...req.body
    }).then(() => {
        res.send(req.body)
    }).catch((err) => {
        res.send('Error')
    })
});

module.exports = router;