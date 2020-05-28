var jwt = require('jsonwebtoken');
var {Service} = require('../db/mongoose');


//middleware for route authentication
const serviceAuthentication = async function (req, res, next) {
    try {
        const token = req.header('authentication').replace('Bearer', '').trim();
        const tokenInfo = jwt.verify(token, 'quickalertapplication');
        req.serviceId = tokenInfo.id;
        next();
    } catch(e) {
        res.status(401).send("Request token invalid");
    }
}

module.exports = serviceAuthentication;