import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../api/application";
import { showToast } from "../utils/toast";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const getAxios = async <T> (
        endpoint:string,
        setPostulations:SetState<T>,
        navigate:ReturnType<typeof useNavigate>) =>{

    // const navigate = useNavigate();
    const url = `${API_URL}${endpoint}`

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
export const getIDAxios = async <T> (
    endpoint: string,
    setData: (data: T) => void ): Promise<void>  =>{

    const url = `${API_URL}${endpoint}`

    try {
        const resp = await axios.get<{ data: T }>(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
            }
        });
        console.log('getIDAxios',resp)

        // if (resp.status === 200 && resp.statusText === "OK") {
            const resp_data = await resp.data
        //     if (resp_data.success) {
                setData(resp_data.data)
                console.log('resp_data getIDAxios: ',resp_data.data)
                // return resp_data
        //     }
        //     // console.log(resp_data.message)
            
        // }else{
        //     console.log(`Ha ocurrido un error inesperado`)
        //     return 
        // }

    
    
    } catch (error) {
        if (axios.isAxiosError(error)) {
        // Manejo específico de errores de Axios
            if (error.response) {
                const dataError = error.response
                if (dataError.data.success === false) {
                    
                    console.log(dataError.data.message)
                }
                
            }
        }
    }
}


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
export const putAxios = async (
        endpoint:string,
        obj_data:any,
        navigate:ReturnType<typeof useNavigate>,
        refreshPostulations: () => void) =>{


        const url = `${API_URL}${endpoint}`
        console.log('url',url)

        try {
            const resp = await axios.put(url,obj_data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
                }
            });
            
            if (resp.status === 200 && resp.statusText === "OK") {
                const resp_data = await resp.data
                console.log('modificado :',resp_data.message)
                if (resp_data.success) {
                    showToast('success',`${resp_data.message}`)
                    refreshPostulations()
                    return 
                }
                
                
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

export const DeleteAxios = async (
        endpoint:string,
        navigate:ReturnType<typeof useNavigate>,
        refreshPostulations: () => void) =>{

    // const navigate = useNavigate();
    const url = `${API_URL}${endpoint}`

    try {
        const resp = await axios.delete(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
            }
        });
        console.log('delete postulacion',resp)

        if (resp.status === 200 && resp.statusText === "OK") {
            const resp_data = await resp.data
            console.log('Eliminado :',resp_data.message)
            if (resp_data.success) {
                showToast('success',`${resp_data.message}`)
                refreshPostulations()
                return 
            }
            
            
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