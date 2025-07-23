import { useState,Fragment, useRef } from "react";
import { Transition } from 'react-transition-group';
import JoyButton  from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Box, Button , TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../api/application";
import axios from "axios";

type Props = {
  onPostulationCreated?: () => void;
};

const RegisterJob = ({onPostulationCreated}: Props) => {
  
  const navigate = useNavigate();


  const [open, setOpen] = useState<boolean>(false);
  const nodeRef = useRef(null);

  const [jobtitle,setJobtitle] = useState<string>('')
  const [company,setCompany] = useState<string>('')
  const [position,setPosition] = useState<string>('')
  const [link,setLink] = useState<string>('')

  const postAxios = async () =>{
    const url = `${API_URL}/job/`
    const obj_data = {
      status_id:1,
      job_title: jobtitle,
      company,
      position,
      link,
      token: localStorage.getItem('authToken')
    }
    console.log(obj_data)

    try {
        const resp = await axios.post(url,obj_data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Opcional
            }
        });

        if (resp.status == 201 && resp.statusText == "Created") {
            const resp_data = await resp.data
            onPostulationCreated?.(); // Llama al callback después de crear
            // setPostulations((postulations) => [...postulations, obj_data])
            // Convierte el objeto a string (poco recomendado)
            // setPostulations(prev => [...prev, JSON.stringify(obj_data)]);
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

  const handleRegister = (e:any) =>{
    e.preventDefault()
    postAxios()
  }

  return (
    <>
    
      <Fragment>
      <JoyButton variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </JoyButton>
      <Transition nodeRef={nodeRef} in={open} timeout={400}>
        {(state: string) => (
          <Modal
            ref={nodeRef}
            keepMounted
            open={!['exited', 'exiting'].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: 'none',
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                  }[state],
                },
              },
            }}
            sx={[
              state === 'exited'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' },
            ]}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <DialogTitle sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >Registrar postulación profesional</DialogTitle>
              <DialogContent>
                <Box component='div' >
                    <Box component='form' className="form" onSubmit={handleRegister}>
                      <TextField
                        type="text"
                        id="input"
                        label="titulo"
                        value={jobtitle}    
                        onChange={(e) => {setJobtitle(e.target.value)}}
                        variant="standard"
                    
                      />
                      <TextField
                          type="text"
                          id="input"
                          label="Compañia/empresa"
                          value={company}    
                          onChange={(e) => {setCompany(e.target.value)}}
                          variant="standard"
                      
                      />
                      
                      <TextField
                          type="text"
                          id="input"
                          label="Puesto profesional"
                          value={position}    
                          onChange={(e) => {setPosition(e.target.value)}}
                          variant="standard"
                      
                      />
                      
                      <TextField
                          type="text"
                          id="input"
                          label="link de postulación"
                          value={link}    
                          onChange={(e) => {setLink(e.target.value)}}
                          variant="standard"
                      
                      />
                      
                      <Button type="submit" id="sumit" variant="contained">Guardar</Button>

                    </Box>
                </Box>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
      </Fragment>


    </>
  )
}

export default RegisterJob