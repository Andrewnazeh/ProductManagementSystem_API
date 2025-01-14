const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const checkUser = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next('You are not login, Please login to get access this route');
    }

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return next('The user that belong to this token does no longer exist');
    }

    req.user = currentUser;
    next();
}

module.exports = checkUser;
