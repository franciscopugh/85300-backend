
export const register = async (req,res) => {
    try {
        console.log(req.user);
        if(!req.user)
            return res.status(400).send("Todos los atributos son necesarios")
        return res.status(201).send(`Usuario creado correctamente con el id: ${req.user?._id}`)
    } catch(e) {
        res.status(500).send(e)
    }
}

export const login = async (req,res) => {
    try {
        if(!req.user._id)
            return res.status(400).send("Usuario o contraseña no validos")
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).send("Usuario logueado correctamente")
    } catch(e) {
        res.status(500).send(e)
    }
}