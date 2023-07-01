const nodemailer = require('nodemailer');
const env = require('./environment');
const ejs = require('ejs');
const path = require('path');

// transporter is the sender of the email and here the configuration of communication is defined
let transporter = nodemailer.createTransport(env.smtp);

// define ejs template to structure email
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        // place from where this function is being called, the view .ejs file for in mailers
        path.join(__dirname, '../views/mailers', relativePath), 
        data, // main data 
        function (error, template) {
            if(error){
                console.log("Error in Rendering Template ",error);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}