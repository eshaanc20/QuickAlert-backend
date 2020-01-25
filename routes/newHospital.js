var express = require('express');
var router = express.Router();
var {Hospital} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    const hospitalInfo = {
        ...req.body
    };
    const newHospital = new Hospital(hospitalInfo);
    newHospital.save().then(() => {
        res.send("New hospital registered");
    }).catch(err => {
        res.send("New hospital was not registered");
    })
})

module.exports = router;