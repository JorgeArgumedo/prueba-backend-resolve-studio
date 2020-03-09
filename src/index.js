/* eslint-disable no-console */
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import dotenv from "dotenv";
import database from "./database";
import authRouter from "./routes/auth";
import secureRouter from "./routes/secure";

dotenv.config({ silent: true });
const PORT = process.env.PORT || 2000;
const app = express();
database();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("morgan")("combined"));

app.use("/", authRouter);
app.use(
    "/paramtoken",
    passport.authenticate("jwt", { session: false }),
    secureRouter
);
app.use(
    "/bearertoken",
    passport.authenticate("jwtBearer", { session: false }),
    secureRouter
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
