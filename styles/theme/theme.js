import { createMuiTheme } from '@material-ui/core';

const colors = {
  primary: { main: '#2c3049' },
};

const theme = createMuiTheme({
    spacing: 10,
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
  },
  overrides: {
    MuiCard: {
        root: {
               backgroundColor: 'pink'
            }
        }
  },
});

export default theme;
