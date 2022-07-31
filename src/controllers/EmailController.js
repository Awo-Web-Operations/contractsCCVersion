const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_PASSWORD, APP_NAME } = require("../config");

let mailTransport = nodemailer.createTransport({
  host: "imap.gmail.com",
  port: 465,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

class MailController {
  constructor(email) {
    this.email = email;
  }

  sendMail(type, htmlData) {
    let mailOptions = {
      from: "norwap@figure.com",
      to: this.email,
      subject: `${APP_NAME} -> ${type}`,
      html: htmlData,
    };

    return mailTransport.sendMail(mailOptions);
  }
}

// let mailing = new Mail('abadaikecollins@gmail.com');
// mailing.SendMail('forget_password', 'klsdwfjnelf, edmwefjwef');

module.exports = MailController;
