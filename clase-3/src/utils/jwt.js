import jwt from 'jsonwebtoken'

let secretKey = "coder1234"

const generateToken = (user) => {
    /*
        Param1: Objeto a almacenar (user)
        Param2: Contraseña
        Param3: TTL tiempo de vida
    */
   const token = jwt.sign({first_name: user.first_name, email: user.email}, secretKey, {expiresIn: '24h'})
   return token 
}

console.log(generateToken({
    "_id":{"$oid":"67a788ec7efbfbeead5edc2b"},"first_name":"Pepe","last_name":"Perez","email":"pepe@pepe.com","password":"$2b$05$1i5Mqr/FKkEhdH7i3FgJJeOsK4GFe7MstRcIY5rpDbjdgDi.O9mAS","age":{"$numberInt":"50"},"__v":{"$numberInt":"0"}}
))

export default generateToken