/*import {Command} from 'commander'
import config from './config.js';

const program = new Command();

console.log(config);

program
    .option('-d', "Variable de debug", false)
    .option('-p <port>', "Puerto de mi aplicacion", 8080)
    .option('--mode <mode>', "Entorno de ejecucion", "development")
    .requiredOption('-u <user>', "Usuario que va a ejecutar esta app", "No se ingreso ningun usuario")
    .option('-l, --letters [letters...]', "Letras de testing")
program.parse()

console.log(program.opts());
console.log(program.args);

*/
import express from 'express'
import { fork } from 'child_process'

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Hola!!")
})

app.get('/suma', function (req,res) {
    const child = fork('./operacionCompleja.js') //Defino el archivo donde va a trabajar el proceso hijo
    child.send("Ponete a laburar") //Envio un mensaje a mi proceso hijo
    console.log("proceso padre", process.pid)
    child.on('message', resultado => {
        console.log(resultado);
        res.status(200).json({resultado: resultado})
    })
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})