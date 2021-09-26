import express from "express";
import controller from "../controller";
import validator from "../middleware/validator/login";

const router = express.Router();

router
  .route("/api/login")
  .get(controller.getOfLogin)
  .post(validator.loginValidator, validator.handler, controller.postOfLogin);

router
  .route("/api/verify/")
  .get(controller.getOfVerify)
  .post(controller.postOfVerify);

export = router;
