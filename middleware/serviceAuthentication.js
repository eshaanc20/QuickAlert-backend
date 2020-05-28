var jwt = require('jsonwebtoken');


//middleware for route authentication
const serviceAuthentication = async function (req, res, next) {
    try {
        const token = req.header('authentication').replace('Bearer', '');
        const tokenInfo = jwt.verify(token, 'quickalertbackend');
        next();
    } catch(e) {
        res.status(402).send("Request token invalid");
    }
}

module.exports = serviceAuthentication;