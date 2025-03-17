import {Router} from 'express'
import cartRouter from './cartsRoutes.js'
import sessionsRouter from './sessionsRoutes.js'
import usersRouter from './usersRoutes.js'
import productsRouter from './productsRoutes.js'

const indexRouter = Router()

indexRouter.use('/api/sessions', sessionsRouter)
indexRouter.use('/api/cart', cartRouter)
indexRouter.use('/api/users', usersRouter)
indexRouter.use('/api/products', productsRouter)
indexRouter.use('*', (req,res) => {
    res.status(404).send("Pagina no encontrada")
})

export default indexRouter