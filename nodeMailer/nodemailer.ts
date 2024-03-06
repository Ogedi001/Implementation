import nodemailer from "nodemailer";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import fs from "fs";
import path from "path";

//text acct
export const signup = async (req: Request, res: Response) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const message = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  try {
    const info = await transporter.sendMail(message);
    res.status(201).json({
      message: "success",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }

  //res.status(201).json("sign up successfully");
};

//send mail from real gmail acct
export const gmailSend = async (req: Request, res: Response) => {
  const { useremail, username } = req.body as {
    useremail: string;
    username: string;
  };

  // Read the EJS template file
  const templatePath = path.join(__dirname, "emails", "signup.ejs");

  const template = fs.readFileSync(templatePath, "utf8");

  //render template with data
  const data = {
    username,
    verificationLink: "www.google.com",
  };
  const htmlContent = ejs.render(template, data);

  // const config = {
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PW,
  //   },
  const config = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PW,
    },
  };
  const transporter = nodemailer.createTransport(config);

  const message = {
    from: `"Ogedi 👻" ${process.env.email} `, // sender address
    to: useremail, // list of receivers
    subject: "Welcome on board bro✔", // Subject line
    // text: "Hello world?, this is plain text", // plain text body
    html: htmlContent, // html body
  };
  try {
    const info = await transporter.sendMail(message);
    res.status(201).json({
      message: "success",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }

  //res.status(201).json("sign up successfully");
};

//send mail from real mailtrap acct
export const mailTrap = async (req: Request, res: Response) => {
  const { useremail } = req.body as { useremail: string };

  const config = {
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MailTrapUser,
      pass: process.env.MailTrapPASS,
    },
  };
  const transporter = nodemailer.createTransport(config);

  const message = {
    from: `info@demomailtrap.com `, // sender address
    to: useremail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?, this is plain text", // plain text body
    html: "<b>Hello bro, hope no stress?</b>", // html body
  };
  try {
    const info = await transporter.sendMail(message);
    res.status(201).json({
      message: "success",
      info: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occured" });
  }

  //res.status(201).json("sign up successfully");
};
