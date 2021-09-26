// external imports
import { Request, Response, NextFunction } from "express";
import utilites from "../utils/utilites";
import mailer from "../utils/mailer";

// Schema for user ~ this will be define in db
type User = {
  id: string;
  code: number;
};

// store otp with id ~ this will be save in db
let users: User[] = [];

// api get response, nother here
const getOfLogin = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json("welcome");
};

// post api to save otp with user id
const postOfLogin = async (req: Request, res: Response, next: NextFunction) => {
  const info: string = req.body.id; // get user id from body
  try {
    if (info) {
      // create user object with id and otp
      const userObject: User = {
        id: info,
        code: utilites.otpGen(6),
      };

      // store in array
      users.push(userObject);

      await mailer.mailTransporter.sendMail(
        mailer.twoFAmailTemplate(userObject.id, "there", userObject.code),
        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log("Email sent: " + data.response);

          // delete otp after 5 minutes
          setTimeout(() => {
            const result = users.find((user) => user.code === userObject.code);
            if (result) {
              users = utilites.removeArrayItem(users, result);
            }
          }, 300000);
        }
      );

      if (users.length !== 0) {
        return res.status(200).json({ msg: "success" });
      }
      return res.status(200).json({ err: "failed, try again" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "internal error" });
  }
};
///

// api to see the users array
const getOfVerify = (req: Request, res: Response, next: NextFunction) => {
  console.log(users);

  return res.status(200).json("welcome");
};

// post api for verify opt
const postOfVerify = (req: Request, res: Response, next: NextFunction) => {
  const code: number = req.body.code;

  try {
    if (users.length !== 0) {
      //check if the code is in the array, in real project it will be also check with id.
      const result = users.find((user) => user.code === code);

      if (result) {
        // delete the opt after verify success
        users = utilites.removeArrayItem(users, result);

        return res.status(200).json({ msg: "success" });
      }
      return res.status(404).json({ err: "failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "internal error" });
  }
};

export default { getOfLogin, postOfLogin, getOfVerify, postOfVerify };
