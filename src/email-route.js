var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// load email form
router.get('/send-mail', function(req, res, next) {
  res.render('contactus', { title: 'Send Mail with nodejs' });
});

// This route will work after submit the form
router.post('/send-email', function(req, res){
   
    var receiver = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;
   

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        requireTLS:true,
        auth: {
          user: 'lensmanpocket@gmail.com', // enter your email address
          pass: 'ahin@2408!'  // enter your visible/encripted password
        }
      });
      
      var mailOptions = {
        from: 'codingstatus@gmail.com',
        to: receiver,
        subject: subject,
        text: message
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email was sent successfully: ' + info.response);
        }
      });
      res.render('contactus', { title: 'Send Mail with nodejs' });
})
module.exports = router;