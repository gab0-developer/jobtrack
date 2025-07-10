import express from "express";
import {config} from "dotenv";
import authRoutes from './routes/authRoutes'
import jobRoutes from './routes/jobRoutes'

config()
const app = express()

app.use(express.json()) //para poner el cuerpo json

// declarar las rutas:   
app.use('/auth',authRoutes)
app.use('/job',jobRoutes)

export default app