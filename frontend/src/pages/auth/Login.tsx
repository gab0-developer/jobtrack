import axios from "axios";
import { Link, useLocation } from 'react-router-dom'; 
import { API_URL } from "../../api/application"
import { useState } from "react";
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import './style-login.css'
import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


type Props = {}

const Login = ({}: Props) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')


    const getAxios = async () =>{
        const url = `${API_URL}/auth/login`
        const obj_data = {
            email,
            password
        }

        try {
            const resp = await axios.post(url,obj_data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (resp.status == 200 && resp.statusText == "OK" && resp.data.success) {
                const resp_data = await resp.data
                const { data: token } = resp.data;
        
                // Guardar el token en localStorage
                localStorage.setItem('authToken', token);
                // Usar la función login del contexto para actualizar el estado global
                login(token);
                // Redirección inteligente
                const from = location.state?.from?.pathname || '/dashboard';
                navigate(from, { replace: true });
                console.log('resp_data del login: ',resp_data)
            
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
                }
            }
        }
    }


  const handleLogin = (e:any) =>{
    e.preventDefault()
    getAxios()
  }
  return (
    <>
        <Container maxWidth="xl" className="conteiner-login">
            <Box component="div" className="container-form">
                <Box component='div'>
                    <Typography variant="h6" component="h6" className="logo-form">
                        💼<strong>JobTrack</strong>
                    </Typography>

                </Box>
                <Box component='center'>
                    <Typography variant="h5" component="h5" className="title-form">
                        <strong>Iniciar Sesión</strong>
                    </Typography>
                </Box>
                <Box component='div' >
                    <form action="" method="post" className="form" onSubmit={handleLogin}>
                        <TextField
                            type="email"
                            id="input"
                            label="Correo"
                            value={email}    
                            onChange={(e) => {setEmail(e.target.value)}}
                            variant="standard"
                        
                        />
                        <TextField
                            type="password"
                            id="input"
                            label="Contraseña"
                            value={password}    
                            onChange={(e) => {setPassword(e.target.value)}}
                            variant="standard"
                        
                        />
                        
                        <Button type="submit" id="sumit" variant="contained">IniciarSesión</Button>

                        <Box component='center' id="link-login" sx={{display:'flex'}}>
                            <Typography component="p">
                                ¿Aún no tienes una cuenta?{' '}
                                <Link 
                                to="/" 
                                style={{ 
                                    color: '#1976d2', 
                                    textDecoration: 'none',
                                    fontWeight: 'bold' 
                                }}
                                >
                                Registrarse
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    </>
  )
}


export default Login
