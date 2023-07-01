// different environment where our app will run
// importing stuff to handle logger file
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// location where logs will be kept.. check if it exists if not create it
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// logs generated when user interacts with the site
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // max time to keep them
    path: logDirectory // location of storage
});


const development = {
    name: 'development', // name of env
    asset_path: './assets', 
    session_cookie_key: 'something',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { 
            user: 'codingpractise02',
            pass: 'pavmptyoxatealfj'
        }
    },
    google_Client_ID: "345971114983-fe4la7mocfgm37m6odgls3it05u09gb4.apps.googleusercontent.com",
    google_Client_Secret: "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",
    google_Callback_URL: "http://localhost:8000/users/auth/google/callback", 
    jwt_Secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSEST_PATH, 
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { 
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_Client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_Client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_Callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL, 
    jwt_Secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

// if env is defined use it or else use development
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);