import { ThemeMode } from "@/types";
import { ThemeOptions } from "@mui/material";

const darkPaletteOverrides = {
  primary:{
    main: '#7b80ff'
  },
  error:{
    main: '#E6492D'
  },
  warning:{
    main: '#F6AB2E'
  },
  success:{
    main: '#38B249'
  },
  info:{
    main: '#1664D8'
  },
  text: {
    primary: '#D8DADE',
    secondary: '#868998'
  },
  background: {
    default: '#111318',
    paper: '#111318',
  },
  divider: '#2b2f3c',
}

const lightPaletteOverrides = {
  primary: {
    main: '#5046e4',
  },
  error:{
    main: '#ec4c47'
  },
  warning:{
    main: '#d9822b'
  },
  success:{
    main: '#27ab6e'
  },
  info:{
    main: '#1070CA'
  },
  text: {
    primary: '#03060B',
    secondary: '#506176'
  },
  divider: '#E1E3EA',
}


export const themeFactory = (mode: ThemeMode): ThemeOptions => ({
    palette: {
      mode,
      secondary: {
        main: '#1E212A',
      },
      ...mode === 'light'
        ?lightPaletteOverrides
        :darkPaletteOverrides
      },
      typography: {
        fontFamily: 'Roboto, Inter, Arial',
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
      }
});
