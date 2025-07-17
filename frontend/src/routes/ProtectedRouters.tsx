import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRoutersProps {
    children?: React.ReactNode;
    user: {
        name: string | null;
        password?: string | null; // Opcional si no siempre está presente
    };
    redirectTo?: string;
}

export const ProtectedRouters = ({ children, user, redirectTo = "/login" }: ProtectedRoutersProps) => {
    if (!user || !user.name) {
        return <Navigate to={redirectTo} replace />;
    }
    
    return children ? children : <Outlet />;
};

