import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});
import express from "express";
import { connectDB } from "./DB/DB";
import auth_router from "./routes/auth/auth-routes";
import cors from "cors";
import * as MiddleWares from "./middleware";
import user_router from "./routes/users/users-routes";
import session from "express-session";

const PORT = process.env.SERVER_PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use("/auth", auth_router);
app.use("/users", MiddleWares.isAuthorized, user_router);
app.listen(PORT, () => console.log("server has started on = %d", PORT));
