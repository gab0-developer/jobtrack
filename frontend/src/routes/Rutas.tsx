// Rutas.tsx
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRouters } from './ProtectedRouters';
import Dashboard from '../pages/Dashboard';
// import Dashboard from './../templates/dashboard/Dashboard';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import IndexJob from '../pages/job/index';

const Rutas = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dash" element={<Dashboard />} /> */}
        
        <Route element={<ProtectedRouters />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job" element={<IndexJob />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};


export default Rutas