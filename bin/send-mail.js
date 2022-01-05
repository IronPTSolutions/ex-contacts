require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASS,
  },
});

transporter
  .sendMail({
    from: "IronHack PT 👻<ironpartime@gmail.com>",
    to: "fransanxenxo@gmail.com",
    subject: "Hello!",
    html: `<h1>Hello Fran</h1>`,
  })
  .then(() => {
    console.log("email sent!");
  })
  .catch(() => {
    console.error("error sending email");
  });
