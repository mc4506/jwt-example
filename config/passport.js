require('dotenv').config();
const passport = require('passport');
const User = require('../models/user');

//use LocalStrategy middleware to authenticate user login
const LocalStrategy = require('passport-local').Strategy;

// use JwtStrategy middleware to authenticate endpoints
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// // Jwt options
// const options = {
//     secretOrKey: process.env.JWT_SECRET,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     jsonWebTokenOptions: {
//         maxAge: '1d'
//     }
// };

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: "Incorrect username" }); }
            if (!user.verifyPassword(password)) { return done(null, false, { message: "Incorrect password" }); }
            return done(null, user, { message: "logged in succesfully" });
        }).select('+password'); 
        //.select adds password field to the query since it is excluded in all other query results from the database
    })
);

// passport.use(
//     new JwtStrategy(options, function(jwt_payload, done) {
//         console.log(jwt_payload);
//         User.findOne({ _id: jwt_payload.sub}, function(err, user) {
//           if (err) return done(err, false);
//           if (user) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//       });
//     })
// );

module.exports = passport;
