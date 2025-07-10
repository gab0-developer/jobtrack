import { User } from "../models/auth";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || ''

export const generateToken = (user:User):string =>{
    return jwt.sign({id:user.id,name:user.name,email:user.email},JWT_SECRET,{expiresIn: '1h' })
}