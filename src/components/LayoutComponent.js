import {
  Container,
  AppBar,
  Typography,
  Box,
  Grid,

} from '@mui/material';
import ResponsiveAppBar from './Navbar';
import PetsIcon from '@mui/icons-material/Pets';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';


const Layout = ({ children }) => {


  return (
    <Container>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
