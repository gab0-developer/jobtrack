import { useState,Fragment, useRef, useEffect } from "react";
import { Box, Button , TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { putAxios } from "../../hooks/axiosApi";

type Props = {
    id:number,
    job_title:string,
    position:string,
    link:string,
    created_at:string,
    company:string,
    status:string,
    refreshPostulations: () => void;
    handleCloseDialogUpdate: () => void;
};

const UpdateJob = ({
    id,
    job_title,
    position:propPosition,
    link:propLink,
    created_at,
    company:propCompany,
    status:propStatus,
    refreshPostulations,
    handleCloseDialogUpdate,
    
    }: Props) => {
  
  const navigate = useNavigate();


  const [localStatus, setLocalStatus] = useState<string>(propStatus || '');
  const [jobTitle, setJobTitle] = useState<string>(job_title || '');
  const [localPosition,setlocalPosition] = useState<string>(propPosition || '')
  const [localLink,setLocalLink] = useState<string>(propLink || '')
  const [localCompany, setLocalCompany] = useState<string>(propCompany || '');

//   const url = `${API_URL}/job/${id}`
  const obj_data = {
    status_id:1,
    job_title: jobTitle,
    company:localCompany,
    position:localPosition,
    link:localLink,
    id:id,
  }

  const handleUpdate = (e:any) =>{
    e.preventDefault()
    putAxios(`/job/${id}`,obj_data,navigate,refreshPostulations)
    handleCloseDialogUpdate()
    console.log('obj_data',obj_data)
    // DeleteAxios(`/job/${postulationID}`,navigate,refreshPostulations)
  }



  return (
    <>
    
        <Box component='div' key={id}>
            <Box component='form' className="form" onSubmit={handleUpdate}>
                <TextField
                fullWidth
                type="text"
                id="input"
                label="titulo"
                value={jobTitle}    
                onChange={(e) => {setJobTitle(e.target.value)}}
                variant="standard"
            
                />
                <TextField
                    fullWidth
                    type="text"
                    id="input"
                    label="Compañia/empresa"
                    value={localCompany}    
                    onChange={(e) => {setLocalCompany(e.target.value)}}
                    variant="standard"
                
                />
                
                <TextField
                    fullWidth
                    type="text"
                    id="input"
                    label="Puesto profesional"
                    value={localPosition}    
                    onChange={(e) => {setlocalPosition(e.target.value)}}
                    variant="standard"
                
                />
                
                <TextField
                    
                    type="text"
                    id="input"
                    label="link de postulación"
                    value={localLink}    
                    onChange={(e) => {setLocalLink(e.target.value)}}
                    variant="standard"
                
                />
                <TextField
                    
                    type="text"
                    id="input"
                    label="link de postulación"
                    value={localStatus}    
                    onChange={(e) => {setLocalStatus(e.target.value)}}
                    variant="standard"
                
                />
                
                <Box component='div' sx={{mt:1}}>
                    <Button type="submit" id="sumit" variant="contained">Guardar</Button>
                </Box>

            </Box>
        </Box>

    </>
  )
}

export default UpdateJob