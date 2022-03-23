import React from 'react';
import './App.css';
import { Warehouse } from './component/Warehouse';
import { createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';

function App() {
    console.log(`NODE_ENV:  ${process.env.NODE_ENV}`);

    const theme = createTheme({
        palette: {
            primary: pink,
        },
    });

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <Warehouse/>
        </ThemeProvider>
    </div>
  );
}

export default App;
