import { Typography, Box, Container, AppBar, Toolbar, Button, IconButton, Grid } from '@mui/material';
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
                        Mi Mascota
                    </Typography>
                    <Button color="inherit">Nosotros</Button>
                    <Button color="inherit">Registrate</Button>
                    <Button color="inherit">Contactanos</Button>
                </Toolbar>
            </AppBar>
            {children}
            <Box sx={{ marginTop: 4, backgroundColor: '#DC7633', padding: '2rem 0' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ marginLeft: 4}}>Contactos</Typography>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="https://www.linkedin.com/in/diaz-carlos-antonio/">Linkdin</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Términos y Condiciones</Typography>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <img src="../assets/Captura5.PNG" alt="Footer Image" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Layout;
