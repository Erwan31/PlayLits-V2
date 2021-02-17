import { createMuiTheme } from '@material-ui/core';

const colors = {
  primary: { main: '#2c3049' },
  secondary: { main: '#FFFFFF'},
};

export const theme = createMuiTheme({
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
    }
  },
});

export default theme;
