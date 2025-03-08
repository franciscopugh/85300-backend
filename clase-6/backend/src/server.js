import express from 'express'
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import session from 'express-session'
import indexRouter from './routes/indexRoutes.js'
import initializatePassport from './config/passport.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser("coderSecret"))
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://franciscopugh01:@cluster0.hhom0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 25 //Tiempo en segundos
    }),
    secret: "coderSecret2",
    resave: true,
    saveUninitialized: true
}))

mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.hhom0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))
.catch((e) => console.log(e))

initializatePassport() //Ejecuto passport con sus estrategias
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})