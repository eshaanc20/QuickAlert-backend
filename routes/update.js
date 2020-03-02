var express = require('express');
var router = express.Router();
var {Alert} = require('../db/mongoose.js');

router.post('/', function(req, res, next) {
    Alert.updateMany({name: req.body.name}, {responded: true}).then(() => {
        res.send("Updated")
    }).catch(err => {
        res.send("Error")
    })
});

module.exports = router;