import { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import { getAxios } from '../hooks/axiosApi';
import { useNavigate } from 'react-router-dom';
import { Box,Container,Typography } from '@mui/material';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

interface Postulation {
  id: number;
  job_title: string;
  position: string;
  link: string;
  created_at:string
  company: string;
  status_id: string;
}

type Props = {}

const Dashboard = ({}:Props) => {
  const navigate = useNavigate();

  const [postulations, setPostulations] = useState<Postulation[]>([]);
  const [postulationPendiente, setPostulationPendiente] = useState<Postulation[]>([]);
  const [postulationAprobada, setPostulationAprobada] = useState<Postulation[]>([]);
  const [postulationRechazada, setPostulationRechazada] = useState<Postulation[]>([]);
  const [postulationEntrevista, setPostulationEntrevista] = useState<Postulation[]>([]);
  // Función para refrescar las postulaciones
  const refreshPostulations =  async () => {
      await getAxios(`/job/`,setPostulations,navigate)
  };

  const findPostulactionStatus = () =>{
    setPostulationPendiente(postulations.filter((item) => item.status_id == `1`))
    setPostulationAprobada(postulations.filter((item) => item.status_id == `2`))
    setPostulationRechazada(postulations.filter((item) => item.status_id == `3`))
    setPostulationEntrevista(postulations.filter((item) => item.status_id == `4`))

  }
  
  useEffect(() =>{
    refreshPostulations()
  },[])
  useEffect(() =>{
    findPostulactionStatus()
  },[postulations])


  return (
    <>
      <Container maxWidth="xl">
        <Box component='div'>
          <Typography variant='h4' >
            Postulaciones:
          </Typography>

        </Box>
        <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'space-around',flexWrap:'wrap'}}>
          <Cards 
            title='Aprobadas'
            count={postulationAprobada.length}
            icon={<AssignmentTurnedInIcon fontSize="large" color="success" />}
          />
          <Cards 
            title='Pendientes'
            count={postulationPendiente.length}
            icon={<AccessTimeIcon fontSize="large" color="warning" />}
          />
          <Cards 
            title='Rechazadas'
            count={postulationRechazada.length}
            icon={<HighlightOffIcon fontSize="large" color="error" />}
          />
          <Cards 
            title='En entrevistas'
            count={postulationEntrevista.length}
            icon={<InterpreterModeIcon fontSize="large" color="secondary" />}
          />
        </Box>
      </Container>
    
      
    </>
  )
}

export default Dashboard