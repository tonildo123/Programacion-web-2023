import { useEffect, useState } from 'react';
import { Button, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
      <Grid item xs={12} md={3} key={index}>
        <Card style={{transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          }, width: "100%", marginBottom: "1rem", marginTop: "1rem" }} className="box">
          <CardMedia component="img" alt="Card Image" maxHeight="240" maxWidth="200" image={card.photo} />
          <CardContent>
            <Typography variant="h6" sx={{whiteSpace: 'nowrap'}}>{card.pickname}</Typography>
            <Typography variant="body1">Vivo en ...</Typography>
            <div style={{ display: "flex", marginTop: "1rem" }}>
              <Button
                color="inherit"
                component={NavLink}
                to="/pets/create"
                sx={{ pt: 1, whiteSpace: 'nowrap', backgroundColor:'#DC7633', color:'white' }}              >
                Ver datellado
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };


  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'flex-start' }} maxWidth="xl" style={{ padding: 0 }}>
      <Grid container>
        <Grid item xs={12} sm={3} className="hidden sm:block" sx={{ backgroundColor: '#FAD7A0' }}>
        <ProfileCard />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FAD7A0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', height: '100vh', margin:3 }}>
            {pets.length === 0 ? <welcomeComponent /> : pets.map(renderCard)}
          </div>
        </Grid>
        <Grid item xs={12} sm={3} className="hidden sm:block" sx={{ height: '100vh', display: 'flex',backgroundColor: '#F8C471', justifyContent:'center', alignItems:'center' }}>
          Publicidad
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home