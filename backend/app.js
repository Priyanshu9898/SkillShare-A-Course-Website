import express from "express";
import course from "./Routes/CourseRouter.js";
import ErrorMiddleware from "./Middlewares/Error.js";
import {config} from "dotenv";
import users from "./Routes/userRouter.js";
import others from "./Routes/OtherRouters.js";
import cookieParser from "cookie-parser";
import payment from "./Routes/paymentRouter.js";
import cors from "cors";


config({
    path: "./config/config.env"
});

import { connectDB } from "./config/Database.js";

connectDB();

const app = express();

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1", course);
app.use("/api/v1", users);
app.use("/api/v1", payment);
app.use("/api/v1", others);

export default app;

app.use(ErrorMiddleware);