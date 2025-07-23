import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../api/application";

export const postAxios = async (endpoint:string,obj_data:any) =>{
        const navigate = useNavigate();

        const url = `${API_URL}${endpoint}`

        try {
            const resp = await axios.post(url,obj_data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
                }
            });

            if (resp.status == 201 && resp.statusText == "Created") {
                const resp_data = await resp.data
                console.log(resp_data.message)
                
                console.log('registro exitoso')
            }else{
                console.log(`Ha ocurrido un error inesperado`)
                return 
            }

        
        
        } catch (error) {
            if (axios.isAxiosError(error)) {
            // Manejo específico de errores de Axios
                if (error.response) {
                    const dataError = error.response
                    if (dataError.data.success === false) {
                        
                        console.log(dataError.data.message)
                    }
                    if (dataError.data.status === 401) {
                        // Manejo de token expirado
                        navigate('/login');
                    }
                }
            }
        }
    }
