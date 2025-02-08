import { hashSync, compareSync } from "bcrypt";

export const createHash = (password) => hashSync(password, 5)

export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD)


