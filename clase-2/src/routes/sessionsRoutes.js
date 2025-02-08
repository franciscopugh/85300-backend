import { Router } from "express";
import passport from "passport";
import { login, register } from "../controllers/sessionsController.js";

const sessionsRouter = Router()

sessionsRouter.post('/login', passport.authenticate('login'), login)
sessionsRouter.post('/register', passport.authenticate("register"), register)

export default sessionsRouter