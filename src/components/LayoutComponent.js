import { Container} from '@mui/material';
import ResponsiveAppBar from './Navbar';
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
