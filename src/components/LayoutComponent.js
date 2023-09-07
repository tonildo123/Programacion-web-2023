import {
  Container,
  AppBar,
  Typography,
  Box,
  Link,
  Grid,

} from '@mui/material';
import { useSelector } from 'react-redux';

import ResponsiveAppBar from './Navbar';
/* import { Link } from 'react-router-dom'; */
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Layout = ({ children }) => {

  const { logged } = useSelector(state => state.logger.user)



  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: '#DC7633' }}>
        <ResponsiveAppBar />
      </AppBar>
      {children}
      <Box sx={{ backgroundColor: '#DC7633', justify: "center", fontFamily: 'Roboto'}}>
        <Grid container spacing={3} padding={4}>
          <Grid item xs={12} sm={4}>
            <ul style={{ listStyle: 'none', display: 'flex' }}>
              <li><FacebookIcon color='action'/></li>
              <li><LinkedInIcon color='action'/></li>
              <li><InstagramIcon color='action'/></li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Typography color="action">
              2023 &copy; Todos los derechos reservados
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="secondary">
                  <Link to="/termsandconditions" color="inherit" underline="none">
                    Términos y Condiciones
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="secondary">
                  <Link to="/" color="inherit" underline="none">
                    Política de Privacidad
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Layout;
