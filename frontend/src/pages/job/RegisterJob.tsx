import { useState } from "react";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { postAxios } from "../../hooks/axiosApi";

type Props = {
  refreshPostulations: () => void;
};

const RegisterJob = ({refreshPostulations}: Props) => {
  
  const navigate = useNavigate();


  const [open, setOpen] = useState<boolean>(false);

  const [jobtitle,setJobtitle] = useState<string>('')
  const [company,setCompany] = useState<string>('')
  const [position,setPosition] = useState<string>('')
  const [link,setLink] = useState<string>('')
  
  const obj_data = {
    status_id:1,
    job_title: jobtitle,
    company,
    position,
    link,
    token: localStorage.getItem('authToken')
  }

  const handleRegister = (e:any) =>{
    e.preventDefault()
    postAxios(`/job/`,obj_data,navigate,refreshPostulations)
    setOpen(false); 
  }

  return (
    <>
    
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Registrar postulación
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Registrar postulación profesional</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Título" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} variant="standard" />
            <TextField label="Compañía/empresa" value={company} onChange={(e) => setCompany(e.target.value)} variant="standard" />
            <TextField label="Puesto profesional" value={position} onChange={(e) => setPosition(e.target.value)} variant="standard" />
            <TextField label="Link de postulación" value={link} onChange={(e) => setLink(e.target.value)} variant="standard" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">Cancelar</Button>
          <Button type="submit" onClick={handleRegister} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default RegisterJob