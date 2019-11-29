const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        const auth = await req.headers.authorization;
        if(!auth) {
            res.status(401).json({
                message:"You do not possess an authorization"
            })
        } else {
            const token = await auth.slice(7);
            const data = await jwt.verify(token, process.env.SECRET);
            await User.find(data);
            req.user = data.isAdmin;
            next();
        }
    }
    catch (err) {
        return next(err)
    }
}