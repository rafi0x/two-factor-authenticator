import nodemailer from "nodemailer";

// nodemail config
const mailTransporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    accessToken: process.env.MAIL_ACCESS_TOKEN,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
  },
});

// email template for send 2fa code
const twoFAmailTemplate = (to: string, name: string, code: number) => {
  const mailBody = {
    from: process.env.MAIL_USER,
    to,
    subject: "Login code",
    text: `Hi ${name},
    \nYour login verification code is ${code}
    \nThis code will valid only for 5 minutes.
    \n\nGood day.`,
  };
  return mailBody;
};

export default { mailTransporter, twoFAmailTemplate };
