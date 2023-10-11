const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

function generateToken(payload)
{
    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token)
{
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
}

module.exports = {
    generateToken,
    verifyToken
}