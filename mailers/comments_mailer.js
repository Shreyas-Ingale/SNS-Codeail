const nodeMailer = require('../config/nodemailer');
// use transporter to send the email while defining the email fields
exports.newComment = (comment) => {
    // the data and relativePath keys in ejs.renderFile function in nodemailer's renderTemplate funcExpn
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'codingpractise02@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published on your Post!",
        html: htmlString
    }, (error, info) => {
        if(error){
            console.log("Error in Sending Mail", error);
            return;
        }
        // console.log("Message Sent!", info);
        return;
    });
}