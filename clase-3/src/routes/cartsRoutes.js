import { Router } from "express";
import { getCart, insertProductCart, deleteProductCart, deleteCart } from "../controllers/cartsController.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCart)
cartRouter.post('/:cid/products/:pid', insertProductCart)
cartRouter.delete('/:cid/products/:pid', deleteProductCart)
cartRouter.delete('/:cid', deleteCart)

export default cartRouter