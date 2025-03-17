import 'dotenv/config'
import { hashSync, compareSync } from "bcrypt";

export const createHash = (password) => hashSync(password, parseInt(process.env.SALT))

export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD)


