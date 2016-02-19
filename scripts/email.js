var nodemailer        = require('nodemailer');
var path              = require('path')

var constants         = require('../scripts/constants');
var config            = require(path.join(constants.paths.config, '/config'));

var smptOptions       = config.get("email.smtp-options");
var transporter       = nodemailer.createTransport(smptOptions);
var emailTemplate     = require('email-templates').EmailTemplate;


var email = {

  // send user registration notification
  sendMailOnRegistration : function(user) {
    if(config.get('email.send-mails')!="true") return;

    var templateDir = path.join(constants.paths.templates, 'email', 'register');
    var registerMail = new emailTemplate(templateDir);
    
    registerMail.render(user, function (err, results) {

      if(err){
        return console.log(err);
      }

      var emailId = user.email;

      var mailOptions = {
          from: 'CVM Admin <cvm-admin@csc.com>', 
          to: emailId, // list of receivers 
          subject: 'User registration activation', // Subject line 
          text: results.text, // plaintext body 
          html: results.html // html body 
      };
     
      // send mail with defined transport object 
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
     
      });
    }); // end of register mail render
  } // end of sendMailOnRegistration

} // end email class

module.exports = email;