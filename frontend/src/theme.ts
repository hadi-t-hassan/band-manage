import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true },
  palette: {
    mode: 'light',
    primary: { main: '#6a5acd' },
    secondary: { main: '#00bcd4' },
    background: { default: '#f7f7fb', paper: '#ffffff' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18, paddingBlock: 10 },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'medium', fullWidth: true },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            '0 10px 25px rgba(106, 90, 205, 0.15), 0 4px 8px rgba(0,0,0,0.04)',
        },
      },
    },
  },
})

