var express = require('express');
var router = express.Router();
const {Alert} = require('../db/mongoose.js');

router.post('/', function(req, res, next) {
    Alert.find({serviceName: req.body.name}).then(alerts => {
        var JSONdata = JSON.stringify(alerts);
        res.send(JSONdata);
    }).catch(err => {
        res.send("No alerts");
    })
});

module.exports = router;