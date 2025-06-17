import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9F43',
      light: '#FFB976',
      dark: '#E68A2E',
    },
    secondary: {
      main: '#1B2850',
      light: '#2A3B6A',
      dark: '#111A36',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    success: {
      main: '#28C76F',
      light: '#48DA89',
      dark: '#1F9D57',
    },
    error: {
      main: '#EA5455',
      light: '#EE7070',
      dark: '#D43A3A',
    },
    info: {
      main: '#00CFE8',
      light: '#33D9ED',
      dark: '#00A5BC',
    },
    warning: {
      main: '#FF9F43',
      light: '#FFB976',
      dark: '#E68A2E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          color: '#1B2850',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#1B2850',
          '&:hover': {
            backgroundColor: 'rgba(27, 40, 80, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(27, 40, 80, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(27, 40, 80, 0.12)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: '80%',
              width: 4,
              backgroundColor: '#1B2850',
              borderRadius: '0 4px 4px 0',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#1B2850',
          minWidth: 40,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#1B2850',
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        item: false,
      },
    },
  },
});

export default theme; 