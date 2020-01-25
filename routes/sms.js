var express = require('express');
const http = require('http');
var router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', function(req, res, next) {
    // const twiml = new MessagingResponse();

    console.log(req.body.From);
    console.log(req.body.Body);
    // twiml.message('Your information has been sent to ' + hospitalName)
    // res.writeHead(200, {'Content-Type': 'text/xml'});
    // res.end(twiml.toString());
})

module.exports = router;