import { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid, Card, CardContent, CardMedia, Stack, CardActions } from '@mui/material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Link, NavLink } from "react-router-dom";
import { db } from '../../firebase';
import ProfileCard from '../../components/ProfileCard';



const Home = () => {

  const [pets, setPets] = useState([]);
  const petCollection = collection(db, "Pet");


  const getPets = async () => {

    const data = await getDocs(petCollection);
    console.log('data');
    console.log(data);

    setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    console.log('mascotas : ');
    console.log(pets);

  }


  const deletePets = async (id) => {

    const petsDoc = doc(db, "Pet", id);
    await deleteDoc(petsDoc);
    getPets();

  }


  const confirmDelete = (id) => {

    console.log(id)

    Swal.fire({
      title: '¿Esta usted seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePets(id);
        Swal.fire(
          'Eliminado!',
          'Su producto fue borrado.',
          'success'
        )
      }
    })

  }

  useEffect(() => {
    getPets();
  }, [])



  const renderCard = (card, index) => {
    return (
      <Grid item xs={6} md={3} key={index}>
        <Card sx={{ height: "100", margin: 1 }} >
          <CardMedia component="img" alt="Card Image" image={card.photo} />
          <CardContent>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>{card.pickname}</Typography>
            <Typography variant="body1">Vivo en ...</Typography>
          </CardContent>
          <CardActions>
            <Button
              color="inherit"
              component={NavLink}
              to="/pets/create"
              sx={{ pt: 1, whiteSpace: 'nowrap', backgroundColor: '#DC7633', color: 'white' }}              >
              Ver detallado
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };


  return (
    <Container sx={{ display: 'flex', alignItems: 'flex-start', padding: 0 }} maxWidth="xl" >
      <Grid container>
        <Grid item xs={12} md={3} className="hidden sm:block" sx={{ backgroundColor: '#FAD7A0' }}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} md={6} sx={{ backgroundColor: '#FAD7A0' }}>
          <Grid container>
            {pets.length === 0 ? <welcomeComponent /> : pets.map(renderCard)}
          </Grid>
        </Grid>
        <Grid item xs={12} className="hidden sm:block" sx={{ height: '100vh', display: 'flex', backgroundColor: '#F8C471', justifyContent: 'center', alignItems: 'center' }}>
          Publicidad
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home