import React from 'react';
import { Container, Typography, Paper, Box, Checkbox, Button } from '@mui/material';




const TermsAndConditions = () => {

  return (
    <Container>
      <Paper elevation={3} >
        <Typography variant="h5" gutterBottom>
          Términos y Condiciones
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Box mt={2}>
          <Checkbox checked={false} />
          <Typography variant="body2">
            Acepto los términos y condiciones.
          </Typography>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary">
            Aceptar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
