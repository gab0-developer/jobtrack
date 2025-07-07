import express from "express";
import {config} from "dotenv";
import authRoutes from './routes/authRoutes'

config()
const app = express()

app.use(express.json()) //para poner el cuerpo json

// declarar las rutas:   
app.use('/auth',authRoutes)

export default app