import { createMuiTheme } from '@material-ui/core';

const colors = {
  primary: { main: '#2c3049' },
  secondary: { main: '#FFFFFF'},
};

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    "fontFamily": `"Nunito", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   },
  spacing: 10,
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    textPrimary: 'white',
  },
  overrides: {
    MuiCard: {
        root: {
               backgroundColor: 'white'
            }
    },
    MuiTypography: {
      root: {
        color: 'white',
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      },
    }
  },
});

export default theme;
