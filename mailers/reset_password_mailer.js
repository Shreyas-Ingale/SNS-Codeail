const nodeMailer = require('../config/nodemailer');

exports.newReset = (data) =>{
    console.log('inside new email mailer');
    let htmlString = nodeMailer.renderTemplate({token: data.token, user: data.user}, '/reset/reset_password.ejs');
    
  
    nodeMailer.transporter.sendMail({
        from: 'codingpractise02@gmail.com',
        to: data.user.email,
        subject: "This is reset link",
        html: htmlString,
    }, (error, info)=>{
        if(error){
            console.log("Error in Sending Mail", error);
            return;
        }
        // console.log("Mail Sent", info)
        return;
    })
}
