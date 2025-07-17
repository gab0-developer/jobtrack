import axios from "axios";
import { Link } from 'react-router-dom'; 
import { API_URL } from "../../api/application"
import { useState } from "react";
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import './style-login.css'
import Container from '@mui/material/Container'
import Typography from "@mui/material/Typography";


type Props = {}

const Login = ({}: Props) => {
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

        if (resp.status == 200 && resp.statusText == "OK" ) {
          const resp_data = await resp.data
          console.log('resp_data: ',resp_data.message)
          
        }else{
          return `Ha ocurrido un error inesperado`
        }

     
      
    } catch (error) {
      console.log('ERROR DE RUTA: ' + error)
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
