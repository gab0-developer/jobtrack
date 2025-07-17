import { Route, Routes } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
// import Dashboard from '../pages/Dashboard'
// import { ProtectedRouters } from './ProtectedRouters'

type Props = {}

const Rutas = ({}: Props) => {
  return (
    <>
        <Routes>
            <Route index element={ <Register/> } /> 
            <Route path='/login' element={ <Login/> }/> 

            {/* ruta para acceder solo si tiene usuario */}
            {/* <Route element={< ProtectedRouters user={storedUser}/>}>
              <Route path='/dashboard' element={< Dashboard user={storedUser}/>} />
             
            </Route> */}
        </Routes>        
    </>
  )
}


export default Rutas