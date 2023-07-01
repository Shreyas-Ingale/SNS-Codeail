const User = require('../../../models/user');
const env = require('../../../config/environment');
const JWT = require('jsonwebtoken'); // import jwt for creating jwt token

// get the sign in data and create a session for the user by creating jwt token
module.exports.createSession = async function(req, res){
    try{
        // take in user details and find if the current user present in the DB
        let user = await User.findOne({email: req.body.email}).select('+password');
        // if not or if passswords dont match promt so
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid Username/Password !"
            });
        }
        // is yes create jwt token and send it to client side
        return res.status(200).json({
            message: "Sign In Successful, Here is the Token Please Keep It Safe !",
            data: {
                token: JWT.sign(user.toJSON(), env.jwt_Secret, {expiresIn: '100000'})
            }
        });
    }catch(error){
        console.log("Error while Creating Session :", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
}