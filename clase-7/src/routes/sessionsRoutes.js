import { Router } from "express";
import passport from "passport";
import { githubLogin, login, register, viewRegister, viewLogin } from "../controllers/sessionsController.js";

const sessionsRouter = Router()

sessionsRouter.post('/login', passport.authenticate('login'), login)
sessionsRouter.post('/register', passport.authenticate("register"), register)
sessionsRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req,res) => {})
sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/api/sessions/login'}), githubLogin)
sessionsRouter.get('/current', passport.authenticate('jwt'), async(req,res) => res.status(200).send(req.user))
sessionsRouter.get('/viewregister', viewRegister)
sessionsRouter.get('/viewlogin', viewLogin)
export default sessionsRouter