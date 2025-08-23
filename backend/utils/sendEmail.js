import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sesar091913@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: "ShopIT <sesar091913@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
};

export default sendEmail;
