import bcrypt from "bcrypt"

// cantidad de veces que se utilizara el hash para hacerlo mas seguro
const SALT_ROUNDS:number=10
export const hasPassword = async (password:string): Promise<string> =>{
    return await bcrypt.hash(password,SALT_ROUNDS)
}

// leer y comparar con el hash de la Base de Datos
export const comparePassword = async (password:string,hash:string): Promise<boolean> =>{
    return await bcrypt.compare(password,hash)
}