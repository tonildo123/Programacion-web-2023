import React from 'react';
import {
    AppBar,
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    Toolbar,
    Typography,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PetsIcon from '@mui/icons-material/Pets';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
    const textColor = 'white';
    const { logged } = useSelector(state => state.logger.user)

    return (
        <AppBar position="static" sx={{ pt: 2, pb: 8, backgroundColor: '#DC7633' }}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Contactos
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" sx={{ color: textColor }}>
                                Correo: <Link href="mailto:correo@example.com" sx={{ color: textColor }}>correo@example.com</Link>
                            </Typography>
                            <Typography variant="body2" sx={{ color: textColor }}>Teléfono: +123456789</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Términos y Condiciones
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" sx={{ color: textColor }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod urna eget eros vehicula.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod urna eget eros vehicula.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod urna eget eros vehicula.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" sx={{ color: textColor }}>
                                Redes Sociales
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" alignItems="center">
                                <IconButton sx={{ color: 'white' }} aria-label="Facebook">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'white' }} aria-label="Twitter">
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton sx={{ color: 'white' }} aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </IconButton>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" alignItems="center">
                            <PetsIcon sx={{  mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component={NavLink}
                                to={logged ? "/home" : "/login"}
                                sx={{
                                    mr: 2,
                                    // display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Mi Mascota
                            </Typography>  
                            </Box>                          
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;
