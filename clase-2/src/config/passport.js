import passport from "passport";
import local from 'passport-local'
import userModel from "../models/userModels.js";
import { createHash, validatePassword } from "../utils/bcrypt.js";

const localStrategy = local.Strategy


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