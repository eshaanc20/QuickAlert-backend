var express = require('express');
var router = express.Router();
var {Service} = require('../db/mongoose');

router.post('/', (req, res, next) => {
    const serviceInfo = {
        ...req.body
    };
    const newService = new Hospital(serviceInfo);
    newService.save().then(() => {
        res.send("New hospital registered");
    }).catch(err => {
        res.send("New hospital was not registered");
    })
})

module.exports = router;