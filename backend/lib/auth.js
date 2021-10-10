const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.status(401).send('Missing auth token.');

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY || 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
};
