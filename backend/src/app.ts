import express from "express";
import {config} from "dotenv";

config()
const app = express()

app.use(express.json()) //para poner el cuerpo json

// declarar las rutas:   
app.use('name_route',() => {})

export default app