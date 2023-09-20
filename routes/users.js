const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', async (req, res, next) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        const user = await User.addUser(newUser);
        res.json({ success: true, msg: 'User registered' });
    } catch (err) {
        res.json({ success: false, msg: 'Failed to register user' });
    }
});

// Authenticate
router.post('/authenticate', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;


    try {
        const user = await User.findOne({ username: username }).exec(); //await User.getUserByUsername(username);
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        const isMatch = await User.comparePassword(password, user.password);
        if (isMatch) {
            const token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800 // 1 week
            });

            res.json({
                success: true,
                token: token,
               // token: 'JWT '+ token, 
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({ success: false, msg: 'Wrong password' });
        }
    } catch (err) {
        throw err;
    }
});

/*
Profile authorization with Headers Approach 
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/profile', (req, res, next) => {
    const token = req.headers.authorization; 

    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
           return next(err);
        }
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Unauthorized' });
        }
        res.json({ user: req.user });
    })(req, res, next);
});
*/

//Profile Direct JWT Verification 
router.get('/profile', (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ success: false, msg: 'Unauthorized' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, msg: 'Unauthorized' });
        }
        res.json({ user: decoded.data });
        
    });
});


module.exports = router;

