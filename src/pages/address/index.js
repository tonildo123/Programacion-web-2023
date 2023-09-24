import React from 'react'
import { Grid,  } from '@mui/material';
import ProfileCard from '../../components/ProfileCard';
import AddresComponent from '../../components/AddresComponent';

const AddressPage = () => {
  return (
    <Grid container >
    <Grid item xs={12} sm={3} sx={{ backgroundColor: '#FEF5E7', }}>
      <ProfileCard />
    </Grid>
    <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FAD7A0' }}>
      <AddresComponent/>
    </Grid>
    <Grid item xs={12} md={3} sx={{ display: 'flex', backgroundColor: '#FEF5E7', justifyContent: 'center', alignItems: 'center' }}>
      Publicidad
    </Grid>
  </Grid>
  )
}

export default AddressPage