const jwt = require('jsonwebtoken');
const { UnAuthorizedError } = require('../utils/apiError.js');
const asyncHandler = require('express-async-handler');

exports.protected = asyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthorizedError('Not Authorized');
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            throw new UnAuthorizedError('Not Authorized');
        } else {
            req.user = decodedToken;
            next()
        }
    });
});
