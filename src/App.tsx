import React from 'react';
import './App.css';
import { Backdrop, BottomNavigation, Card, CardContent, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { grey, pink, yellow } from '@mui/material/colors';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import ResponsiveAppBar from './component/AppBar/ResponsiveAppBar';
import { Warehouse } from './component/Warehouse/Warehouse';
import { useKeycloak } from '@react-keycloak/web';
import { WakeupService } from './service/WakeupService';
import { Products } from './component/Products/Products';
import { styled } from '@mui/styles';
import { Footer } from './component/Footer/Footer';

function App() {
    const theme = createTheme({
        palette: {
            primary: pink,
            secondary: yellow
        },
    });

    const MyThemeComponent = styled('div')(({ theme: any }) => ({
        // backgroundColor: grey.A100,
        height: '100vh',
        background: `linear-gradient(45deg, ${pink['50']} 30%, ${grey['50']} 10%)`,
        // marginBottom: '130px'
    }));

    const {keycloak} = useKeycloak();

    WakeupService.wakeup();

    return (
        <div className="App" style={{textAlign: "center"}}>
            <ThemeProvider theme={theme} >
                {
                    keycloak.authenticated ?
                        <Router>
                            <MyThemeComponent>
                                <ResponsiveAppBar/>
                                <Routes>
                                    <Route path="/" element={<Warehouse/>}/>
                                    <Route path="/products" element={<Products/>}/>
                                </Routes>
                            </MyThemeComponent>
                            <Footer/>
                        </Router> :
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={!!keycloak.authenticated}
                        >
                            <CircularProgress color="primary"/>
                        </Backdrop>
                }
            </ThemeProvider>
        </div>
    );
}

export default App;
