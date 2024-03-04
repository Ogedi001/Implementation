import nodemailer from "nodemailer";
import { Request, Response } from "express";
import dotenv from 'dotenv'


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
    res
      .status(201)
      .json({
        message: "success",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }

  //res.status(201).json("sign up successfully");
};


export const gmailSend = async (req: Request, res: Response) => {
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
      res
        .status(201)
        .json({
          message: "success",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
    } catch (error) {
      res.status(500).json({ error: "An error occured" });
    }
  
    //res.status(201).json("sign up successfully");
  };
  