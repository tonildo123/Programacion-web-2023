import {
  Container,
  AppBar,
  Typography,
  Box,
  Grid,

} from '@mui/material';
import { useSelector } from 'react-redux';

import ResponsiveAppBar from './Navbar';
import { NavLink } from 'react-router-dom';


const Layout = ({ children }) => {

  const { logged } = useSelector(state => state.logger.user)



  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: '#DC7633' }}>
        <ResponsiveAppBar />
      </AppBar>
      {children}
      <Box sx={{ marginTop: 4, backgroundColor: '#DC7633' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ marginLeft: 4 }}>Contactos</Typography>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="https://www.linkedin.com/in/diaz-carlos-antonio/">Linkdin</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">
              <NavLink to="/termsandconditions">
                Términos y Condiciones
              </NavLink>
            </Typography>
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
