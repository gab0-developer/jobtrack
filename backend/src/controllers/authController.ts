import { Request, Response } from "express";
import prisma from "../prisma";
import { comparePassword, hasPassword } from "../services/password.service";
import { generateToken } from "../services/auth.service";

export const register = async (req: Request,res: Response): Promise<void> => { 
    const {name,email,password} = req.body

    try {
        if (!name){
            res.status(400).json({success: false, message:'Su nombre es obligaatorio'})
            return
        }
        if (!email){
            res.status(400).json({success: false, message:'Su correo electronico es obligatorio'})
            return
        }
        if (!password){
            res.status(400).json({success: false, message:'Su contraseña es obligaatorio'})
            return
        }

        const hashedPassword = await hasPassword(password)

        const user = await prisma.users.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })
        const token = generateToken(user)

        res.status(201).json({success:true,message:`Usuario ${user.name} registrado exitosamente`,data:token})

    } catch (error:any) {

        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({message:'Ese correo ya esta registrado. Ingrese con un nuevo email'})
        }
        console.log(`${error}`)
        res.status(500).json({success:false, message : `Error interno del servidor: ${error}`})
    }
}

export const login = async (req: Request,res: Response): Promise<void> => {
    const {email,password} = req.body

    try {
        
        if (!email){
            res.status(400).json({success: false, message:'Su correo electronico es obligatorio'})
            return
        }
        if (!password){
            res.status(400).json({success: false, message:'Su contraseña es obligaatorio'})
            return
        }

        const user = await prisma.users.findUnique({where: {email:email}})
        if(!user){
            res.status(400).json({success: false, message:'Usuario no registrado'})
            return
        }

        const passwordMathc = await comparePassword(password,user.password)
        if (!passwordMathc) {
            res.status(401).json({success: false, message:'Usuario o contraseña no coinciden'})
            return
        }

        const token = generateToken(user)
        res.status(200).json({
            success: true,
            message:'Inicio de sesión éxitoso',
            data: token,
        })

    } catch (error) {
        res.status(500).json({success:false, message : `Error interno del servidor: ${error}`})
    }

}