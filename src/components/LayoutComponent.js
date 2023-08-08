import React from 'react';
import { Typography, Box, Container, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ children }) => {
    return (
        <Container>
            <AppBar position="static" sx={{ backgroundColor: '#DC7633' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Mi mascota
                    </Typography>
                    <Button color="inherit">Nosotros</Button>
                    <Button color="inherit">Registrate</Button>
                    <Button color="inherit">Contactanos</Button>
                </Toolbar>
            </AppBar>
            {children}
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="body2" color="textSecondary">
                    Footer content
                </Typography>
            </Box>
        </Container>
    );
};

export default Layout;
