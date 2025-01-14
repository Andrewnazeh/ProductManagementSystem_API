const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const createToken = require('../utils/createToken');

exports.register = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        res.status(201).json({ success: true, message: 'User registered successfully', user });
    } catch (error) {
        next(error);
    }


};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = createToken(user._id);

        res.status(200).json({ success: true, message: 'Login successful', user, token });
    } catch (error) {
        next(error);
    }


};