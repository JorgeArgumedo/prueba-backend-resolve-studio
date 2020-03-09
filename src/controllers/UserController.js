/* eslint-disable no-underscore-dangle */
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TYPE, parseError, resultFormat } from "../utils/resultFormat";
import "../auth";

dotenv.config({ silent: true });

// Toma la informacion del usuario que le pasa la estrategia signup y la retorna como respuesta
const signup = async (req, res) => {
    const { user } = req;
    res.status(200).json(
        resultFormat(TYPE.success, "Registro exitoso", { user })
    );
};

// Usa la estrategia Singin para evaluar el usuario y si es exitoso, crea el token y lo retorna
const signin = async (req, res, next) => {
    passport.authenticate("signin", async (err, user, info) => {
        try {
            if (err || !user) {
                res.status(500).json(
                    resultFormat(TYPE.error, info.message, req.user)
                );
            }
            req.login(user, { session: false }, async error => {
                if (error) res.status(500).json(parseError(error)); // return next(error);
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
                res.status(200).json(
                    resultFormat(TYPE.success, info.message, { token })
                );
            });
        } catch (error) {
            res.status(500).json(parseError(error));
        }
    })(req, res, next);
};

export default { signup, signin };
