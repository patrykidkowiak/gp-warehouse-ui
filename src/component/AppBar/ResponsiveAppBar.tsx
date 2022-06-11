import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { keycloak } = useKeycloak();
    const isAuthenticated = keycloak.authenticated;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{
                            height: 70,
                            width: 70,
                        }}
                        src='logo_without_name.png'
                    />

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    aria-label="account of current user"*/}
                        {/*    aria-controls="menu-appbar"*/}
                        {/*    aria-haspopup="true"*/}
                        {/*    onClick={handleOpenNavMenu}*/}
                        {/*    color="inherit"*/}
                        {/*>*/}
                        {/*    <MenuIcon/>*/}
                        {/*</IconButton>*/}
                        {/*<Menu*/}
                        {/*    id="menu-appbar"*/}
                        {/*    anchorEl={anchorElNav}*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: 'bottom',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    keepMounted*/}
                        {/*    transformOrigin={{*/}
                        {/*        vertical: 'top',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    open={Boolean(anchorElNav)}*/}
                        {/*    onClose={handleCloseNavMenu}*/}
                        {/*    sx={{*/}
                        {/*        display: {xs: 'block', md: 'none'},*/}
                        {/*    }}*/}
                        {/*>*/}

                        {/*    /!*<MenuItem onClick={handleCloseNavMenu}>*!/*/}
                        {/*    /!*    <Typography textAlign="center">Magazyn</Typography>*!/*/}
                        {/*    /!*</MenuItem>*!/*/}
                        {/*</Menu>*/}
                    </Box>
                    {/*<Typography*/}
                    {/*    variant="h6"*/}
                    {/*    noWrap*/}
                    {/*    component="div"*/}
                    {/*    sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}*/}
                    {/*>*/}
                    {/*    LOGO*/}
                    {/*</Typography>*/}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {/*<Button*/}
                        {/*    onClick={handleCloseNavMenu}*/}
                        {/*>*/}
                        {/*    <Link to={'/products'}>Produkty</Link>*/}
                        {/*</Button>*/}
                        {/*<Button*/}
                        {/*    onClick={handleCloseNavMenu}*/}
                        {/*>*/}
                        {/*    <Link to={'/'}>Magazyn</Link>*/}
                        {/*</Button>*/}
                    </Box>
                    {
                        !isAuthenticated &&
                        <Button
                            id="qsLoginBtn"
                            color="secondary"
                            className="btn-margin"
                            onClick={() => keycloak.login()}
                        >
                            Log in
                        </Button>
                    }
                    {
                        isAuthenticated &&
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={keycloak?.tokenParsed?.preferred_username}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => keycloak.logout()}>
                                    <Typography textAlign="center">Log out</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
