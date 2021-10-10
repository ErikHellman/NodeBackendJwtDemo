var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var { User } = require('./db');
const jwt = require("jsonwebtoken");

router.post('/', async (req, res) => {
    const authInfo = req.body;
    console.log('Try login for:', authInfo);
    const user = await User.findOne({ userName: authInfo.userName }).exec();
    console.log('Found user:', user);
    const match = await bcrypt.compare(authInfo.password, user.password);
    console.log('Match:', match);
    if (match) {
        const token = jwt.sign({ userName: user.userName }, process.env.JWTPRIVATEKEY || 'secret', { expiresIn: '1h' });
        console.log('Token:', token);
        res.send(token);
    } else {
        res.status(400).send({ error: 'login failed' });
    }
});

module.exports = router;
