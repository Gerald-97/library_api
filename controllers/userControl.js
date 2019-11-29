const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userReg = async (req, res, next) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        var data = await User.findOne({ email });
        if (data) {
            return res.status(400).json({
                message: 'User has been registered already'
            })
        } else {
            var salt = await bcrypt.genSalt(10);
            var hash = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                password: hash,
                email,
                isAdmin
            });
            await newUser.save();
            console.log(newUser)
            return res.status(201).json({
                message: 'User created successfully'
            })
        }
    }
    catch (err) {
        return next(err);
    }
}

const userLogin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        var data = await User.findOne({ email });
        if (!data) {
            return res.status(401).json({
                message: "User doesn't exist"
            })
        } else {
            if (name !== data.name && password !== data.password) {
                return res.status(401).json({
                    message: "Invalid name/password"
                })
            } else {
                const token = jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: '5h'});
                return res.status(200).json({
                    message: "Logged in Successfully",
                    token
                })
            }
        }
    }
    catch (err) {
        return next (err);
    }
}

const userDisplay = async (req, res, next) => {
    try {
        var data = await User.find();
        res.status(200).json({
            message:"Users returned successfully",
            data
        })
    }
    catch (err) {
        return next(err)
    }
}

module.exports = { userReg, userLogin, userDisplay };