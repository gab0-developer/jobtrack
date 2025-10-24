// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // bordes redondeados
          textTransform: "none", // evita mayúsculas
          padding: "8px 20px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
     MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#cf940bce", // fondo oscuro con transparencia
          color: "#fff", // texto blanco
          fontSize: "0.85rem",
          fontWeight: 500,
          borderRadius: "12px", // bordes redondeados
          padding: "8px 12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.25)", // efecto flotante
        },
        arrow: {
          color: "#cf940be7", 
        },
      },
    },
  },
});
