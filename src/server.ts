// external imports
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

// internal imports
import twofaRouter from "./router/index";
import middlewares from "./middleware/index";

// main app
const app: express.Application = express();

// moddileware function
middlewares(app);

// routers
app.use(twofaRouter);

// server listen
app.listen(process.env.PORT, function () {
  console.log(`server on ${process.env.PORT}`);
});
