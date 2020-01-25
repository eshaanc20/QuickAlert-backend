var express = require('express');
var router = express.Router();
const accountSid = 'AC84dd42e957c3408ec8ba31f627010cd2';
const authToken = 'e14bca51b87abba59f8180974154cd45';
const client = require('twilio')(accountSid, authToken);

router.get('/', function(req, res, next) {
    client.messages
        .create({
            body: "Testing",
            from: +13658005631,
            to: +16476397482
        })
})

module.exports = router;