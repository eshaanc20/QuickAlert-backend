var jwt = require('jsonwebtoken');


//middleware for route authentication
const userAuthentication = async function (req, res, next) {
    try {
        const token = req.header('authentication').replace('Bearer', '').trim();
        const tokenInfo = jwt.verify(token, 'quickalertapplication');
        next();
    } catch(e) {
        res.status(401).send("Request token invalid");
    }
}

module.exports = userAuthentication;