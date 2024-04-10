import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import dotevn from "dotenv";

dotevn.config();

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // host name
  port: process.env.SMTP_PORT, // host port number
  auth: {
    user: process.env.EMAIL_HOST_USER, // email address
    pass: process.env.EMAIL_HOST_PASSWORD, // email password
  },
});

const accountActivationEmail = async ({ code, email, subject, link }) => {
  console.log(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.EMAIL_HOST_USER,
    process.env.EMAIL_HOST_PASSWORD
  );
  try {
    const mailInfo = {
      from: `Activation Code <${code}>`, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: `
     <main style="min-height:100vh;padding:25px 6px;background-color:#f7f8fe;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#000"><div style="margin:auto;width:fit-content"><div style="max-width:500px"><figure style="margin:auto;text-align:center"><img src="https://github.com/KINSUST/image/blob/main/kin-logo.png?raw=true" alt style="width:140px;margin:auto"></figure></div><div class="main-container" style="max-width:500px;background-color:#fff;border:1px solid #bab9b9;padding:15px;border-radius:5px"><div class="mail-header"></div><div class="mail-body" style="font-size:18px"><p style="text-align:center;margin:0;padding-bottom:8px;font-size:20xp;font-weight:600">KIN Account Activation Code</p><p style="margin:0;padding:4px;text-align:justify;font-size:15px">We received a request to create a account.To verify your email address, please use the following verification code:</p><p style="text-align:center"><span style="margin:0;font-size:25px;font-weight:900;letter-spacing:6px">${code}</span></p><br><div align="center" style="padding-bottom:10px"><a href=${link} style="background-color:#00f;color:#fff;border-radius:5px;text-decoration:none;padding:5px 8px">Activation Link</a></div><p style="margin:0;padding:4px;font-size:15px;text-align:center">Thanks,<br><span style="font-family:Arial #000;color:red">KIN</span>A Voluntary Organization,<span style="font-weight:700">SUST</span></p></div></div></div></main>

     `,
    };

    const info = await transport.sendMail(mailInfo);
    console.log("Message sent: %s", info.envelope.to[0]);
  } catch (error) {
    console.log("Message sent failed!");
  }
};

export default accountActivationEmail;
