import passport from "passport";
import { Strategy as StrategyLocal } from "passport-local";
import { Strategy as StrategyJWT, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import UserModel from "../models/UserModel";

dotenv.config({ silent: true });
// Esta estrategia guarda la informacion suministrada y la envia al siguiente middleware
passport.use(
    "signup",
    new StrategyLocal(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.create({ email, password });
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Esta estrategia busca el usuario, valida la contraseña, envia el usuario o false si no realiza el login al siguiente middleware
passport.use(
    "signin",
    new StrategyLocal(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    return done(null, false, {
                        message: "Usuario no encontrado",
                    });
                }
                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, false, {
                        message: "Contraseña incorrecta",
                    });
                }
                return done(null, user, {
                    message: "Inicio sesión correctamente",
                });
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Esta estrategia obtiene el JWT del parametro query especificado y le pasa la informacion al siguiente middleware
passport.use(
    new StrategyJWT(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter(
                process.env.QUERY_PARAMETER_TOKEN
            ),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Esta estrategia obtiene el JWT del de la cabecera de autorizacion Bearer Token y le pasa la informacion al siguiente middleware
passport.use(
    "jwtBearer",
    new StrategyJWT(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
