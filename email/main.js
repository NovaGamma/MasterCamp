import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "ManganagerMail@gmail.com",
      accessToken: "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"
    }
});

var mailOptions = {
  from: 'ManganagerMail@gmail.com',
  to: 'elvin.aupiais-berthy@efrei.net',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
