var express = require('express');
var router = express.Router();
const {Alert} = require('../db/mongoose.js');

router.post('/', function(req, res, next) {
    Alert.updateOne({name: req.body.name}, {responded: true}).then(() => {
        res.send("Updated")
    }).catch(err => {
        res.send("Error")
    })
});

module.exports = router;