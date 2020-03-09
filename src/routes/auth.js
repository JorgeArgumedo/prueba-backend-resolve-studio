import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/UserController";
import "../auth";

const router = Router();

router.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    UserController.signup
);

router.post("/signin", UserController.signin);

export default router;
