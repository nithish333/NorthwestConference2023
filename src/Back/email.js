const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');

const sendWelcomeEmail = (email, name) => {
    console.log(email,name);
  sgMail.send({
    from: "nithish.kommineni@gmail.com",
    to: email,
    subject: "Thanks for registering to northwest conference app",
    text: `Welcome ${name} to the northwest conference`,
    dynamicTemplateData:{
        "template_id":"d-fa7b2593996c4f328177604936e6b2c7"
    }
  });
};
module.exports = {
  sendWelcomeEmail,
};