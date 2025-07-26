import { useState,Fragment, useRef, useEffect } from "react";
import { Autocomplete, Box, Button , TextField } from '@mui/material';

import { format, parseISO } from 'date-fns';
// import { es } from 'date-fns/locale';

import { useNavigate } from 'react-router-dom';
import { getAxios, putAxios } from "../../hooks/axiosApi";

interface StatusItem {
  id: number;
  status_name: string;
} 

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
  const [listStatus, setListStatus] = useState<StatusItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(null);

//   const url = `${API_URL}/job/${id}`
  const obj_data = {
    status_id:selectedStatus?.id,
    job_title: jobTitle,
    company:localCompany,
    position:localPosition,
    link:localLink,
    // id:id,
  }

  const handleUpdate = (e:any) =>{
    e.preventDefault()
    putAxios(`/job/${id}`,obj_data,navigate,refreshPostulations)
    handleCloseDialogUpdate()
    console.log('obj_data',obj_data)
  }

  useEffect(() =>{
      getAxios(`/status/`,setListStatus,navigate)
  },[])

 // indicar estado actual cuando la lista esté cargada
  useEffect(() => {
    if (listStatus.length > 0 && propStatus) {
      // Convertir propStatus a número si es necesario
      const statusId = typeof propStatus === 'string' ? parseInt(propStatus) : propStatus;
      const currentStatus = listStatus.find(item => item.id === statusId);
      setSelectedStatus(currentStatus || null);
    }
  }, [listStatus, propStatus]);



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
                    
                    type="date"
                    id="input"
                    label="Fecha de postulación"
                    value={format(parseISO(created_at), "yyyy-MM-dd")}    
                    // onChange={(e) => {setLocalStatus(e.target.value)}}
                    variant="filled"
                    InputProps={{
                      readOnly: true, // Bloquea cambios pero mantiene el estilo normal
                    }}
                />

                <Autocomplete 
                        id="autocomplete" 
                        options={listStatus}
                        value={selectedStatus}
                        onChange={(e, newValue: StatusItem | null) => {
                          setSelectedStatus(newValue);
                        }}
                        getOptionLabel={(option) => option.status_name}
                        renderInput={(params) => <TextField {...params} label="Estatus" variant="outlined" />}
                      />
{/* 
                 <Autocomplete
                    id="status-select"
                    options={listStatus}
                    value={selectedStatus}
                    onChange={(_, newValue) => setSelectedStatus(newValue)}
                    getOptionLabel={(option) => option.status_name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Estado actual"
                        variant="outlined"
                        fullWidth
                        
                      />
                    )}
                  /> */}

                
                <Box component='div' sx={{mt:1}}>
                    <Button type="submit" id="sumit" variant="contained">Guardar</Button>
                </Box>

            </Box>
        </Box>

    </>
  )
}

export default UpdateJob