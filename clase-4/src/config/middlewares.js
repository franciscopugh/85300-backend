export const authorization = (rol) => {
    return async (req,res,next) => {
        if(!req.user)
            return res.status(401).send("Usuario no autenticado")
        if(req.user.rol != rol)
            return res.status(403).send("Usuario no autorizado")
        next()
    }
}