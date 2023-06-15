const express = require('express'); // import express
const cookieParser = require('cookie-parser'); // import cookie parser for accessingg cookies
const app = express();  // start express
const port = 8000; // default port for express server
const expressLayouts = require('express-ejs-layouts'); // import express ejs layout
const db = require('./config/mongoose');
// import passport.js passport-local-strategy and express session for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo'); // import connect mongo to store cookie in it also pass the crnt session arguement
const sass = require('sass'); // import sass for using it on top of a css file
const flash = require('connect-flash'); // import connect-flash for flash messages
const customMiddleware = require('./config/middleware'); //import custom middleware
const bodyParser = require('body-parser'); // import readymade middleware

// readymade middleware to convert browser form strings to javascript objects
app.use(bodyParser.urlencoded({ extended: true }));
// middleware to assign secret to sign cookies
app.use(cookieParser());
// using static for access styling and js files 
app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// extratc styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// using Express EJS Layouts to say that all views belong to this layout use before router
app.use(expressLayouts);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// start expressjs session to create session cookie and store logged in users encrypted info into it
app.use(session({
    name: 'codeial', //name of cookie
    secret: 'something', // the secret encrypt key but using random text for now
    saveUninitialized: false, // false means dont save data incookie if user is not logged in
    resave: false, // false means if user info(id) is present in cookie dont change it by some other info
    cookie: {
        maxAge: (1000 * 60 * 100)  //(milisecond <- * second * minute)
    },
    store: MongoStore.create({ // used to store the session cookie in the db
        // mongoUrl: 'mongodb://127.0.0.1/codeial_development', can also use this(without mongoose direct mongodb link)
        client: db.getClient(), // mongoose client
        autoRemove: 'disabled' //dont remove the data automatically
    }, function(error){
        console.log(error || 'connect-mongo Set Up OK');
    })
}));

// start passport and its session functionality
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// start connect-flash to store flash messages in session cookies hence used here 
// and call custom middlware to pass it to ejs to show it on browser
app.use(flash());
app.use(customMiddleware.setFlash);

// using Express Router to handle all requests
app.use('/', require('./routes'));

// Start server and check if it's running or not
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`); // used interpolation using backtick " ` " 
    }

    console.log(`Server is running on Port : ${port}`);
});