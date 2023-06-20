// import passport.js
const passport = require('passport');
// import OAuth2Strategy property of passport's Google-OAuth library
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// import crypto to generate random password for google authenticated accounts
const crypto = require('crypto');
// import user
const User = require('../models/user');

// using Passport's Google-OAuth Strategy to use google to Sign-In/Sign-Up
// using below options to set up the token 
passport.use(new googleStrategy({
    clientID: "102632466672-b0isdvf84060npib2dar3nnu9upmq99m.apps.googleusercontent.com", // our id
    clientSecret: "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",// used for encryption
    callbackURL: "http://localhost:8000/users/auth/google/callback" // upon success redirect here
}, function (accessToken, refreshToken, profile, done) {
    // find if google authenticated user exist in our DB through email-id
    User.findOne({ email: profile.emails[0].value }).then(function (user) {
        console.log("accessToken :", accessToken,"\nrefreshToken :" ,refreshToken);
        console.log(profile);
        if (user) {
            // if yes return the user and set it up as req.user
            return done(null, user);
        } else {
            // if not then create the user and set it up as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex') // random 20 bytes password
                // since google authenticated accounts don't have password with them
            }).then(function (user) {
                // once created return the user and set it up as req.user
                return done(null, user);
            }).catch(function (err) {
                console.log("Error in Creating the user from Google-OAuth", err);
                return done(err, false);
            });
        }
    }).catch(function (err) {
        console.log("Error in Finding the user from Google-OAuth", err);
        return done(err, false);
    });// upon 3rd party sign-in from google, it will send the users agreed info to passport
}));// then we check if the user is in db, return if yes, create and return if no
// token is generated when google sends data back as accessToken and refreshToken(used to recreate accessToken if expired)

module.exports = passport;