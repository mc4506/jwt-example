require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateJWT(user) {
    const expiresIn = '10m';

    const payload = {
        sub: user.id,
        username: user.username,
        iat: Math.floor(Date.now()/1000)
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
    
    return {
        token: "Bearer " + token,
        expires: expiresIn
    };
};

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    generateJWT: generateJWT,
    authenticateJWT: authenticateJWT
};