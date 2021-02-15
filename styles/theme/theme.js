import { createMuiTheme } from '@material-ui/core';

const colors = {
  primary: { main: '#2c3049' },
};

const theme = createMuiTheme({
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
