import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
    },
  },
  
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      }
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '150%',
          letterSpacing: '0.15px',
          color: 'rgba(0, 0, 0, 0.87)'
        }
      }
    }
  },
  
});

export default theme;