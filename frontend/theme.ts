'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables:{
    colorSchemeSelector: 'class'
  },
  colorSchemes:{
    dark: {
      palette: {
        primary: {
          main: '#7b80ff',
        },
        secondary: {
          main: '#1E212A',
        },
        error: {
          main: '#E6492D',
        },
        warning:{
          main: '#F6AB2E',
        },
        success: {
          main: '#38B249',
        },
        info: {
          main: '#1664D8',
        },
        text: {
          primary: '#E1E3EA',
          secondary: '#506176'
        },
        background:{
          default: '#111318',
          paper: '#111318',
        },
      }
    }
  },
  palette:{
    secondary: {
      main: "#1E212A",
      dark: "#1E212A",
    },
    primary:{
      light: '#5046e4',
      dark: '#7b80ff',
      main: '#7b80ff',
    },
    error:{
      main: '#ec4c47',
      light: '#E6492D',
      dark: '#E6492D'
    },
    warning: {
      light: '#d9822b',
      main: '#F6AB2E',
      dark: '#F6AB2E'
    },
    success:{
      light: '#27ab6e',
      main: '#38B249',
      dark: '#38B249'
    },
    info: {
      light: '#1070CA',
      main: '#1664D8',
      dark: '#1664D8'
    },
    text: {
      primary: '#03060B',
      secondary: '#506176'
    },
    // background:{
    //   default: '#111318',
    //   paper: '#111318',
    // },
    divider: '#E1E3EA',
    
  },
  typography: {
    fontFamily: 'var(--font-inter)',
    h1: {
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      fontFamily: 'Inter, sans-serif',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontFamily: 'Inter, sans-serif',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.75,
      fontFamily: 'Inter, sans-serif',
      letterSpacing: 0
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      fontFamily: 'Inter, sans-serif',
      letterSpacing: 0
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.6,
      fontFamily: 'Inter, sans-serif',
      letterSpacing: 0
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 2.46,
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    },
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
  
});

export default theme;