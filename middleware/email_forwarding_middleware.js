const nodemailer = require("nodemailer");

const forwardMailMiddleware = (req, res, next) => {
  if (req.method === "POST" && req.originalUrl === "/interested_route") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_email_password",
      },
    });

    const mailOptions = {
      from: "req.body.email",
      to: "recipient_email@example.com",
      subject: "Contact Us Form",
      text: JSON.stringify(`${req.body.name},
      
      ${req.body.message}`),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  next();
};

module.exports = forwardMailMiddleware;
