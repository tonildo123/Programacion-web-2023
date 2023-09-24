/* eslint-disable */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import PetsIcon from '@mui/icons-material/Pets';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { unlogger } from '../state/LoginSlice';

const settingsLogged = [{ 'label': 'Mi Perfil', 'ruta': '/profile/edit' },
                  { 'label': 'Cambiar contraseña', 'ruta': '/profile/password' }];
const settingsUnLogged = [{ 'label': 'Acceder', 'ruta': '/login' },
                  { 'label': 'Recuperar contraseña', 'ruta': '/profile/password-recovery' }];                  

const menuDrawerUnlogged = [{ 'label': 'Registrarme', 'ruta': '/register' },
                            { 'label': 'Contactanos', 'ruta': '/nosotros' },];

const menuDrawerLogged = [{ 'label': 'Inicio', 'ruta': '/home' },
                    { 'label': 'Mis mascotas', 'ruta': "/pets/create" },
                    { 'label': 'Cambiar contraseña', 'ruta': '/profile/password' }];                    

function ResponsiveAppBar() {

    const dispatch = useDispatch()

    const { logged } = useSelector(state => state.logger.user)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const Salir = () => {
        dispatch(unlogger())
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#DC7633' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={logged ? "/home" : "/login"}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Mi Mascota 
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none', color: 'black' },
                            }}
                        >
                            {!logged && menuDrawerUnlogged.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Typography component={NavLink}
                                        to={`${page.ruta}`} textAlign="center" style={{ color: 'black' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                            {logged && menuDrawerLogged.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Typography 
                                    component={NavLink}
                                    to={`${page.ruta}`} 
                                    textAlign="center" 
                                    style={{ color: 'black' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <PetsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to={logged ? "/home" : "/login"}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Mi mascota
                    </Typography>{/**mobile */}
                    {/**desde aqui web */}
                    {logged ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/pets/create"
                            sx={{ pt: 1 }}
                        >
                            Mis mascotas
                        </Button>
                    </Box> 
                    : <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/register"
                            sx={{ pt: 1 }}
                        >
                            Registrarme 
                        </Button>
                    </Box>}
                    {/**web */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>                                
                                <AccountCircleIcon sx={{ fontSize: {xs:26, sm:40}, color:'white' }}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            {logged && settingsLogged.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" component={NavLink}  to={`${setting.ruta}`}>                                        
                                        {setting.label}                                        
                                    </Typography>
                                </MenuItem>
                            ))}
                            
                            {logged &&
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button textAlign="center" onClick={Salir} >                                        
                                        Salir                                     
                                    </Button>
                                </MenuItem>}
                            {!logged && settingsUnLogged.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" component={NavLink}  to={`${setting.ruta}`}>                                        
                                        {setting.label}                                        
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;