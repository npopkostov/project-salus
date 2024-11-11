import nodemailer from "nodemailer";

const SMTP_KEY_VALUE = process.env.SMTP_KEY_VALUE;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "7da0e1001@smtp-brevo.com",
    pass: SMTP_KEY_VALUE,
  },
});

export const mailService = (request, toEmail, verificationLink, verificationCode) => {
  if (request === "newUser") {
    const mailOptions = {
      from: "iarhiva01@gmail.com",
      to: toEmail,
      subject: "Verify your Account",
      html: `<p>Your verifitaction code is: ${verificationCode} \n Click the link to verify your account: <a href="${verificationLink}">Verify your Account</a></p>`,
    };
    return transporter.sendMail(mailOptions);
  }
  if (request === "passwordReset") {
    const mailOptions = {
      from: "iarhiva01@gmail.com",
      to: toEmail,
      subject: "Password change request",
      html: `<p>You requested a password reset.  <a href="${verificationLink}">Change your password</a></p>`,
    };
    return transporter.sendMail(mailOptions);
  }
};
