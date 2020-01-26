var express = require('express');
var router = express.Router();
const {User} = require('../db/mongoose.js');

router.post('/', function(req, res, next) {
    User.find({}).then(alerts => {
        var JSONdata = JSON.stringify(alerts);
        res.send(JSONdata);
    }).catch(err => {
        res.send("No alerts");
    })
});

module.exports = router;