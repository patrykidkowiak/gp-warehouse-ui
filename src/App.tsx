import React from 'react';
import './App.css';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { pink, yellow } from '@mui/material/colors';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import ResponsiveAppBar from './component/AppBar/ResponsiveAppBar';
import { Warehouse } from './component/Warehouse';
import { useKeycloak } from '@react-keycloak/web';
import { WakeupService } from './service/WakeupService';

function App() {
    const theme = createTheme({
        palette: {
            primary: pink,
            secondary: yellow
        },
    });

    const {keycloak} = useKeycloak();

    WakeupService.wakeup();

    return (
        <div className="App" style={{textAlign: "center"}}>
            <ThemeProvider theme={theme}>
                {
                    keycloak.authenticated ?
                        <Router>
                            <ResponsiveAppBar/>
                            <Routes>
                                <Route path="/" element={<Warehouse/>}/>
                            </Routes>
                        </Router> : <CircularProgress color="primary"/>
                }
            </ThemeProvider>
        </div>
    );
}

export default App;
