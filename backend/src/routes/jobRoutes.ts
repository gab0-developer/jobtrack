import express, { NextFunction, Request, Response } from "express";
import { createJob, deleteJob, getAllJobAuth, getJobById, updateJob } from "../controllers/jobController";
import jwt from "jsonwebtoken"

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

// Extiende la interfaz Request de Express para incluir user_id
declare global {
  namespace Express {
    interface Request {
      user_id?: number; // Asegúrate de que coincida con el tipo en tu DB (ej: number o string)
    }
  }
}

const authenticateToken = (req: Request,res: Response, next: NextFunction) => {
    // el token se manda a traves de los headers
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(401).json({success: false, message:'No autorizado'})
        return
    }
    // VERIFICAR TOKEN SI EXITE EN EL USUARIO
    jwt.verify(token,JWT_SECRET, (error, decoded) =>{
        if (error) {
            console.warn('erro en la autenticacion :', error)
            res.status(403).json({success: false, message:'No tiene acceso a este recurso'})
            return
        }
        // Asegúrate de que decoded tenga la estructura correcta
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.user_id = decoded.id; // Asigna el ID del usuario al objeto Request
            next();
        } else {
        return res.status(403).json({ success: false, message: 'Token malformado' });
        }
    })

}

router.post('/',authenticateToken, createJob)
router.get('/:id',authenticateToken, getJobById)
router.get('/',authenticateToken, getAllJobAuth)
router.put('/:id',authenticateToken, updateJob)
router.delete('/:id',authenticateToken, deleteJob)
// router.post('/login',login)


export default router