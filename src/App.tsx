import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { pink, yellow } from '@mui/material/colors';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import ResponsiveAppBar from './component/app-bar/ResponsiveAppBar';
import { Warehouse } from './component/Warehouse';


function App() {
    console.log(`NODE_ENV:  ${process.env.NODE_ENV}`);

    const theme = createTheme({
        palette: {
            primary: pink,
            secondary: yellow
        },
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <ResponsiveAppBar/>
                    <Routes>
                        <Route path="/" element={<Warehouse/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
