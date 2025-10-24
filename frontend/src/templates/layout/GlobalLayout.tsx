import { useAuth } from '../../context/AuthContext';
import { Outlet, useLocation, useNavigate  } from 'react-router-dom';
import * as React from 'react';
import { Box, createTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work'; // ícono para "job" o "trabajo"
import {
  AppProvider,
  type Session,
  type Navigation,
  DashboardLayout
} from '@toolpad/core';
import { DemoProvider } from '@toolpad/core/internal';
import './layout.css'

import { theme as customTheme } from '../../theme';
import { deepmerge } from '@mui/utils';

interface GlobalLayoutProps {
//   children: React.ReactNode;
  window?: () => Window;
}

const demoTheme = createTheme(deepmerge(customTheme, {
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
}));

const GlobalLayout = ({ window }: GlobalLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigateRR = useNavigate();

  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
        //   active: location.pathname.includes('/dashboard'),
    },
    {
        segment: 'job',
        title: 'Postulaciones',
        icon: <WorkIcon />,
    }
    // Agrega más rutas según necesites
  ];

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: user?.name || '',
          email: user?.email || '',
        },
      });
    },
    signOut: logout,
  }), [user, logout]);

  const router = React.useMemo(() => ({
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (url: string | URL) => {
      if (typeof url === "string") {
        navigateRR(url);
      } else {
        navigateRR(url.toString()); // ✅ convertir URL a string
      }
    },
    // Link: Link, // opcional, pero recomendable
  }), [location, navigateRR]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <>
      <DemoProvider window={demoWindow}>
        <AppProvider
          session={session}
          authentication={authentication}
          branding={{
            logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
            title: '',
            homeUrl: '/dashboard',
          }}
          navigation={NAVIGATION}
          router={router} 
          theme={demoTheme}
          window={demoWindow}
        >
          <DashboardLayout defaultSidebarCollapsed
            sx={{
              '& .MuiDrawer-root.MuiDrawer-docked': {
                maxWidth: 200,
                transition: 'width 0.3s ease',
              },
              '& .MuiDrawer-paper': {
                maxWidth: 200,
              },
              '& .MuiBox-root': {
                  maxWidth:'100%'
                },
          }}
          >
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Outlet />
            </Box>
          </DashboardLayout>
        </AppProvider>
      </DemoProvider>
    </>
  );
};

export default GlobalLayout;