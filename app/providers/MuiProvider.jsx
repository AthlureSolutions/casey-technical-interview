'use client';
import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function MuiProvider({ children }) {
  // Create the theme on the client side using useMemo
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'dark', 
    },
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
