// import passport.js
const passport = require('passport');
// import Strategy property of passport's JWT library
const jwtStrategy = require('passport-jwt').Strategy;
// import ExtractJwt property of passport's JWT library to extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;
// import user
const User = require('../models/user');
const env = require('./environment');
// some options to set up jwt 
let opts = {
    // reads the JWT token from the http Authorization header with the scheme 'bearer'
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // secretOrKey is a string or buffer containing the secret/PEM-encoded public key, for verifying the token's signature.
    // used for encryption and decryption of tokens
    secretOrKey : env.jwt_Secret
}
// jwtPayload contains the decoded info in payload, done is passport error first callback function
// with 3 arguements of (err, user, info)
passport.use(new jwtStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id).then(function(user) {
        if (user) {
            // return user
            return done(null, user);
        } else {
            // user not found
            return done(null, false);
        }
    }).catch(function(err){
        console.log("Error in finding the user from JWT", err);
        return done(err, false);
    });// user info is stored encoded in Payload after jwt token is formed and from there id is taken
}));// no password required since id was encoded and unique safe untill someone finds out your id
//password and username/email will checked while creating jwt in users_api.js

module.exports = passport;