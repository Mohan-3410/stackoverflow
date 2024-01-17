const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req.userId = decodeData?.id;
        next();
    } catch (e) {
        console.error(e);
    }
}
module.exports = { auth }