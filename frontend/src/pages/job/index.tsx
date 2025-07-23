import RegisterJob from "./RegisterJob"


import { Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { regexPrimeraLetra } from "../../utils/regexPatterns";
import axios from "axios";
import { API_URL } from "../../api/application";
import { useEffect, useState } from "react";
import Tarjetas from "../../components/Tarjetas";


// En Listjob.tsx
interface Postulation {
  id: number;
  job_title: string;
  created_at:string
  company: string;
}


type Props = {
    Postulation:string[]
}

const index = ({}: Props) => {

    const { user } = useAuth();

    const [postulations, setPostulations] = useState<Postulation[]>([]);

    const regexmatch = user.name.match(regexPrimeraLetra);
    const primeraLetra = regexmatch?.groups?.inicial || "";

     

    const getAxios = async () =>{
        const url = `${API_URL}/job/`
    
        try {
            const resp = await axios.get(url,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
                }
            });
            console.log('Get tareas usuario',resp)
    
            if (resp.status === 200 && resp.statusText === "OK") {
                const resp_data = await resp.data
                if (resp_data.success) {
                    setPostulations(resp_data.data)
                    console.log('resp_data',resp_data.data)
                }
                // console.log(resp_data.message)
                
            }else{
                console.log(`Ha ocurrido un error inesperado`)
                return 
            }
    
        
        
        } catch (error) {
            // if (axios.isAxiosError(error)) {
            // // Manejo específico de errores de Axios
            //     if (error.response) {
            //         const dataError = error.response
            //         if (dataError.data.success === false) {
                        
            //             console.log(dataError.data.message)
            //         }
            //         if (dataError.data.status === 401) {
            //             // Manejo de token expirado
            //             navigate('/login');
            //         }
            //     }
            // }
        }
    }

    // Función para refrescar las postulaciones
    const refreshPostulations = async () => {
        await getAxios(); // Reutiliza tu función existente
    };
    
    useEffect(() =>{
        getAxios()
    },[])


    return (
        <>
            
           <RegisterJob
                onPostulationCreated={refreshPostulations}
             />
           
            <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'space-around',flexWrap:'wrap',marginY:2}}>
                {postulations.map((postulation,index) => (
                    <Tarjetas 
                        index={index}
                        primeraLetra={primeraLetra}
                        job_title={postulation.job_title}
                        created_at={postulation.created_at}
                        company={postulation.company}
                    />
                ))}
            </Box>
            
        </>
    )
}

export default index