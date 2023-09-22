import { useEffect, useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardMedia,  CardActions } from '@mui/material';
import { collection, getDocs,} from 'firebase/firestore';
import { NavLink } from "react-router-dom";
import { db } from '../../firebase';
import ProfileCard from '../../components/ProfileCard';
import WelcomeComponent from '../../components/welcomeComponent';
import { useSelector, useDispatch } from 'react-redux';
import { petArraySuccess } from '../../state/ArrayPetSlice';


const Home = () => {

  const [pets, setPets] = useState([]);
  const petCollection = collection(db, "Pet");
  const dispatch = useDispatch();
  const state = useSelector(state => state)


  const getPets = async () => {

    if(state.userPetsArray.pets.length > 0){

      setPets(state.userPetsArray.pets)

    } else {
      const data = await getDocs(petCollection);

      setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    

  }

  useEffect(() => {
    getPets();
    console.log(state)
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
  



  const renderCard = (card, index) => {
    return (
      <Grid item key={index}>
        <Card sx={{ height: "350px", width: { xs: "100%", sm: "200px" }, p: 1, my:'2px' }} >
          <CardMedia
            component="img"
            alt="Card Image"
            image={card.photo}
            sx={{ width: '100%', height: '200px' }} />
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
    <Grid container>
      <Grid item xs={12} md={3} sx={{ backgroundColor: '#FEF5E7' }}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} md={6} sx={{ backgroundColor: '#FAD7A0' }}>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          {pets.length === 0 ? <WelcomeComponent /> : pets.map(renderCard)}
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', backgroundColor: '#FEF5E7', justifyContent: 'center', alignItems: 'center' }}>
        Publicidad
      </Grid>
    </Grid>
  )
}

export default Home