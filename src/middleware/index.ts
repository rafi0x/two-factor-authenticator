// external imports
import express from "express";
import morgan from "morgan";
import cors from "cors";

// middlewares array
const middlewares: any[] = [
  cors(),
  morgan("dev"),
  express.json(),
  express.urlencoded({
    extended: true,
  }),
];

// function for use middlweares
export = (app: express.Application) => {
  middlewares.map((m) => {
    app.use(m);
  });
};
