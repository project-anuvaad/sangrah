import { createMuiTheme } from '@material-ui/core/styles';


const themeDefault = createMuiTheme({

  typography: {
    fontFamily: '"Source Sans Pro", "Arial", sans-serif',
    fontSize: 11
  },
  
  palette: {
    primary: {
      light: '#922d88',
      main: '#392c71',
      dark: '#1c9ab7',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000',
      contrastText: '#FFFFFF'
    },
    background: {
      // default: '#C0C0C0'
    }
  },
  status: {
    danger: 'orange'
  },
  drawer: {
    default: '#696969'
  }

});



themeDefault.typography.h6 = {
  fontSize: '1.125rem',
  fontWeight: '500',
  fontFamily: '"Poppins", sans-serif',
  '@media (min-width:600px)': {  
  },
  [themeDefault.breakpoints.up('md')]: {
    
    },

};
// themeDefault.typography.h6 = {
//   fontSize: '1.2rem',
//   fontFamily: '"Poppins", sans-serif',
//   '@media (min-width:600px)': {
//     fontSize: '1.125rem',
//   },
//   [themeDefault.breakpoints.up('md')]: {
//     fontSize: '1.125rem',
//     fontWeight: '500'
//   },
// };
export default themeDefault;
