import { Request, response, Response } from "express";
import prisma from "../prisma";

export const getStatus = async (req: Request,res: Response): Promise<void> => {
    // const {status_id} = req.body

    try {
        
        const status = await prisma.status.findMany()
        if (status.length === 0) {
            res.status(200).json({ 
                success: true, 
                message: 'No hay estatus registrados',
                data: [] 
            });
            return;
        }
        res.status(200).json({success:true, data :status})
        
    } catch  (error:any) {
        console.log(`${error}`)
        res.status(500).json({success:false, message : `Error interno del servidor: ${error.message}`})
        
    }
} 