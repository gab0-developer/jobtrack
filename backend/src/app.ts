import express from "express";
import cors from 'cors';
import {config} from "dotenv";
import authRoutes from './routes/authRoutes'
import jobRoutes from './routes/jobRoutes'

config()
const app = express()
// O configuración personalizada (recomendado para producción)
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con el origen de tu app React
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Si usas cookies o autenticación JWT en headers
}));

app.use(express.json()) //para poner el cuerpo json

// declarar las rutas:   
app.use('/auth',authRoutes)
app.use('/job',jobRoutes)

export default app