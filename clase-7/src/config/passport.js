import 'dotenv/config'
import passport from "passport";
import local from 'passport-local'
import GithubStrategy from 'passport-github'
import jwt from 'passport-jwt'
import userModel from "../models/userModels.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";

const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

//Extraer la cookie de jwt del navegador de mi cliente
const cookieExtractor = (req) => {
    let token = null
    if(req.cookies) {
        token = req.cookies["coderSession"] //Consulto por la cookie generada
    }
    
    return token
}


const initializatePassport = () => {
    passport.use('register', new localStrategy({passReqToCallback: true, usernameField: 'email'},async(req,username, password, done) => {
        try {
            const {first_name, last_name, email, password, age} = req.body
    
            if(first_name == undefined || last_name == undefined || email == undefined || password == undefined || age == undefined) {
                return done(null, false) //No hubo error pero no se creo el nuevo usuario
            } else {
                let user = await userModel.create({
                    first_name: first_name, 
                    last_name: last_name,
                    email: email,
                    password:  createHash(password), 
                    age:  age})
    
                return done(null, user) //Usuario creado correctamente
            }
    
        } catch(e) {
            return done(e) //Error al crear usuario
        }
    }))

    passport.use('login', new localStrategy({usernameField: 'email'}, async (username, password,done) => {
        try {
            const user = await userModel.findOne({email: username})
            if(user && validatePassword(password, user.password))
                return done(null, user)
            else 
                return done(null, false)
        } catch(e) {
            return done(e)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: "Iv23li7ZHQ7g1dbdAT53",
        clientSecret: "", 
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            
            let user = await userModel.findOne({email: profile._json.email})
            if(!user) {
                const user = await userModel.create({
                    first_name: profile._json.name,
                    last_name: " ", 
                    email: profile._json.email,
                    password: createHash("coder"), //Dato no proporcionado por github, pass por defecto
                    age: 18
                })
                done(null, user)
            } else {
                done(null, user)
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //De donde saco el token
        secretOrKey: process.env.SECRET_JWT
    },(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (e) {
            return done(e)
        }
    }))

    //Permitar autenticar via HTTP
    passport.serializeUser((user, done) => {
        done(null, user?._id)
    })
    
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializatePassport