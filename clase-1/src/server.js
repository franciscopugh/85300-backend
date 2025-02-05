import express from 'express'
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import usersRouter from "./routes/usersRoutes.js"

const app = express()
const PORT = 8080

function auth(req,res,next) {
    console.log(req.session);
    
    if(req.session?.rol == "Admin") {
        return next()
    }
    return res.status(403).send("Usuario no autorizado")
}

app.use(express.json())
app.use(cookieParser("coderSecret"))
app.use(session({
    secret: "coderSecret2",
    resave: true,
    saveUninitialized: true
}))

mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.hhom0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))
.catch((e) => console.log(e))

app.use('/api/users', usersRouter)

app.get('/setCookie', (req,res) => {
    res.status(200).cookie('coderCookie', "cookie cookie", {maxAge: 150000, signed: true}).send("Cookie creada")
})

app.get('/getCookies', (req,res) => {
    res.status(200).send(req.signedCookies) //Consulto solamente las cookies firmadas
})

app.get('/deleteCookie', (req,res) => {
    res.clearCookie('coderCookie').send("Cookie eliminada")
})

app.get('/session', (req,res)=> {
    if(req.session.counter) {
        req.session.counter++
        res.send(`Esta pagina se ha visitado ${req.session.counter} veces`)
    }else {
        req.session.counter = 1
        res.send("Bienvenido/a")
    }
})

app.get('/logout', (req,res)=> {
    req.session.destroy((e) => {
        if(!e)
            res.send("Logout Ok")
        else
            res.send(e)
    })
})

app.post('/login', (req,res)=> {
    const {email, password} = req.body

    if(email == "pepe@pepe.com" && password == "coder") {
        req.session.email = email
        req.session.rol = "Admin"
        res.status(200).send("Usuario logueado correctamente")
    } else {
        res.status(400).send("Usuario no valido")
    }
})

app.get('/private',auth, (req,res)=> {
    res.status(200).send("Recursos de admin!!!!")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})