// external imports
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// email validator
const loginValidator = [
  check("id").isEmail().withMessage("Invalid email address").trim(),
  //   check("mobile")
  //     .isMobilePhone("bn-BD", {
  //       strictMode: true,
  //     })
  //     .withMessage("Mobile number must be a valid Bangladeshi mobile number")
];

// validator handler
const handler = function (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    return next();
  } else {
    // response the errors
    return res.status(500).json({
      invalid: mappedErrors,
    });
  }
};

export default {
  loginValidator,
  handler,
};
