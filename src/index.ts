import express, { json } from 'express'
import './setup.js'
import 'express-async-errors'
import cors from 'cors'
import router from './routers/routes.js'
import errorHandler from './middlewares/errorHandlingMiddleware.js'

const app = express()

app.use(cors())
app.use(json())
app.use(router)
app.use(errorHandler)

export default app
