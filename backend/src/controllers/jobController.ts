import { Request, response, Response } from "express";
import prisma from "../prisma";

export const createJob = async (req: Request,res: Response): Promise<void> => { 
    
    const { status_id,job_title,company,position,link} = req.body

    try {
        if (!job_title){
            res.status(400).json({success: false, message:'El título es obligaatorio'})
            return
        }
        if (!company){
            res.status(400).json({success: false, message:'El nombre de la organización/Empresa es obligatorio'})
            return
        }
        if (!position){
            res.status(400).json({success: false, message:'La vacante postulada es obligaatorio'})
            return
        }

        const postulation = await prisma.postulations.create({
            data:{
                user_id:req.user_id!, // Usa el ID del usuario autenticado (! indica que confías en que no es undefined),
                status_id:status_id,
                job_title,
                company,
                position,
                link,
            }
        })

        res.status(201).json({success:true,message:`registrado exitosamente`,data:postulation})

    } catch (error:any) {

        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message:'Ese correo ya esta registrado. Ingrese con un nuevo email'})
        }
        console.log(`${error}`)
        res.status(500).json({success:false, message : `Error interno del servidor: ${error}`})
    }
}

export const getJobById = async (req: Request,res:Response): Promise<void> =>{
    const postulationId = parseInt(req.params.id)
    try {
        const postulation = await prisma.postulations.findUnique({where: {id : postulationId}})
        if(!postulation){
            res.status(404).json({success: false, message: `No existe la postulación`})
            return
        }

        res.status(200).json({success: true, data: postulation})
        
    } catch (error) {
        res.status(500).json({success:false, message : `Error interno del servidor: ${error}`})
    }
}
export const getAllJobAuth = async (req: Request,res:Response): Promise<void> =>{
    
    try {
        // traer todos los usuarios
        
        const postulations = await prisma.postulations.findMany({where: {user_id : req.user_id}})
        // findMany siempre devuelve un array (vacío si no hay registros)
        if (postulations.length === 0) {
            res.status(200).json({ 
                success: true, 
                message: 'No hay postulaciones registradas',
                data: [] 
            });
            return;
        }
        res.status(200).json({success:true, data :postulations})

    } catch (error:any) {
        console.log(`${error}`)
        res.status(500).json({success:false, message : `Error interno del servidor: ${error.message}`})
    }
} 

export const updateJob =async (req:Request,res:Response): Promise<void> =>{
    const postulationId = parseInt(req.params.id)

    const {status_id,
                job_title,
                company,
                position,
                link,} = req.body

    try {
        let dataToUpdate:any = { ...req.body }
        // cambiar email
        if(status_id){
            dataToUpdate.status_id = status_id
        }
        if(job_title){
            dataToUpdate.job_title = job_title
        }
        if(company){
            dataToUpdate.company = company
        }
        if(position){
            dataToUpdate.position = position
        }
        if(link){
            dataToUpdate.link = link
        }
        // update email 
        const postulations = await prisma.postulations.update({
            where:{id:postulationId},
            data:{
                status_id:dataToUpdate.status_id,
                job_title:dataToUpdate.job_title,
                company:dataToUpdate.company,
                position:dataToUpdate.position,
                link:dataToUpdate.link
            }
        })
    
        res.status(200).json({success:true, message:'modificacion exitosa',data :postulations})

    } catch (error:any) {
        // Error específico de email duplicado
        // P2002: (violación de restricción única en Prisma)
        if (error?.code === 'P2002') {
            res.status(404).json({message:'postulacion no encontrado'})
        }else{
            console.log(`${error}`)
            res.status(500).json({success:false, message : `Error interno del servidor: ${error}`})
        }
    }
}

export const deleteJob = async (req: Request,res:Response): Promise<void> =>{
    const userId = parseInt(req.params.id)
    try {
        // traer todos los usuarios
        
        const postulations = await prisma.postulations.delete({where: {id : userId}})
        
        res.status(200).json({
            success:true, 
            message :`La postulación ${postulations.job_title} ha sido eliminado permanentemente`
        }).end()

    } catch (error:any) {
        if (error?.code === 'P2002') {
            res.status(404).json({message:'Postulacion no encontrada'})
        }else{
            console.log(`${error}`)
            res.status(500).json({success:false, message : `Error interno del servidor: ${error}`})
        }
    }
}