import { useAuth } from '../context/AuthContext';
import { Button } from '@mui/material';



type Props = {}

const Dashboard = ({}:Props) => {

  const { user,logout } = useAuth();


  return (
    <>
      <h1>Bienvenido, {user?.name}</h1>
      <Button 
        variant="contained" 
        color="error"
        onClick={logout}
      >
        Cerrar sesión
      </Button>
    

    </>
  )
}

export default Dashboard