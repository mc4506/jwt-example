require('dotenv').config();
const User = require('../models/user');
const passport = require('../config/passport');
const utils = require('./utils');

module.exports = function(app) {
    app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
        const user = {
            username: req.user.username,
            id: req.user._id
        };
        // save user info into a JWT
        const token = utils.generateJWT(user);
        res.json(token);
    });

    app.post('/signup', (req, res) => {
        User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then( () => {
            res.send("Successfully created user");
        }).catch( err => {
            console.log(err);
        });
    });

    app.get('/profile', utils.authenticateJWT, (req, res, next) => {
        // res.json({ user: req.user, message: "Successfully authenticated user" });
        User.findOne( {_id: req.user.sub }).then( result => {
            res.json(result);
        }).catch( err => {
            console.log(err);
        })
    })
};