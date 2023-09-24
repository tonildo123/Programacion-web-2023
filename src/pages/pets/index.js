/* eslint-disable */
import { useEffect, useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { NavLink } from "react-router-dom";
import { db } from '../../firebase';
import ProfileCard from '../../components/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import WelcomeComponent from '../../components/welcomeComponent';
import { petSuccess } from '../../state/PetSlice';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { petArrayRemove, petArraySuccess } from '../../state/ArrayPetSlice';


const MisMascotas = () => {

  const state = useSelector(state => state)
  const [pets, setPets] = useState([]);
  const petCollection = collection(db, "Pet");
  const dispatch = useDispatch();

  const getPets = async () => {

    if(state.userPetsArray.pets.length > 0){

      setPets(state.userPetsArray.pets)

    } else {

      const data = await getDocs(petCollection);

      setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }    

  }

  const deletePets = async (card) => {

    const petsDoc = doc(db, "Pet", card.id);
    await deleteDoc(petsDoc);
    // await deleteFile(card.photo, 'PetsFolder')
    dispatch(petArrayRemove(card.id));
    getPets();

  }


  const HandleDeletePet = (card) => {

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
        deletePets(card);
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

  if (pets.length > 0) {
    for (let i = 0; i < pets.length; i++) {
      const pet = {
        id: pets[i].id,
        idUser: pets[i].idUser,
        pickname: pets[i].pickname,
        photo: pets[i].photo,
      };

      // Verifica si la mascota ya existe en el estado antes de agregarla
      const isPetAlreadyAdded = state.userPetsArray.pets.some(
        (existingPet) => existingPet.id === pet.id
      );

      if (!isPetAlreadyAdded) {
        dispatch(petArraySuccess(pet));
      }
    }
  }
}, [pets.length]);


  const HandleStatePet = (card) => {

    const pet = {
      id: card.id,
      idUser: card.idUser,
      pickname: card.pickname,
      photo: card.photo,
    }

    dispatch(petSuccess(pet))

  }



  const renderCard = (card, index) => {
    return (
      <Grid item key={index}>
        <Card sx={{ height: "350px", width: { xs: "100%", sm: "200px" }, my: '2px' }} >
          <CardMedia
            component="img"
            alt="Card Image"
            image={card.photo}
            sx={{ width: '100%', height: '200px' }} />
          <CardContent>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>{card.pickname}</Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              color="inherit"
              onClick={() => { HandleStatePet(card) }}
              component={NavLink}
              to="/pets/mis-mascotas/edit"
              sx={{ pt: 1, whiteSpace: 'nowrap', backgroundColor: '#DC7633', color: 'white' }}              >
              Editar
            </Button>
            <IconButton
              onClick={() => { HandleDeletePet(card) }}
              sx={{ pt: 1, whiteSpace: 'nowrap', color:'#DC7633' }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  };


  return (
    <Grid container>
      <Grid item xs={12} md={3} sx={{ backgroundColor: '#FEF5E7' }}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} md={6} sx={{ backgroundColor: '#FAD7A0' }}>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          {pets.length === 0 ? <WelcomeComponent /> : (
          pets
            .filter(pet => pet.idUser == state.logger.user.id) 
            .map(renderCard) 
        )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', backgroundColor: '#FEF5E7', justifyContent: 'center', alignItems: 'center' }}>
        Publicidad
      </Grid>
    </Grid>
  )
}

export default MisMascotas