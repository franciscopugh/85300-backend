import { Router } from "express";
import { getCart, insertProductCart, deleteProductCart, deleteCart, checkout } from "../controllers/cartsController.js";
import passport from 'passport'
import {authorization} from '../config/middlewares.js'

const cartRouter = Router()

cartRouter.get('/:cid', passport.authenticate("jwt"), authorization("User"), getCart)
cartRouter.post('/:cid/products/:pid', passport.authenticate("jwt"), authorization("User"), insertProductCart)
cartRouter.post('/:cid/checkout', passport.authenticate("jwt"), authorization("User"), checkout)
cartRouter.delete('/:cid/products/:pid', passport.authenticate("jwt"), authorization("User"), deleteProductCart)
cartRouter.delete('/:cid', passport.authenticate("jwt"), authorization("User"), deleteCart)

export default cartRouter