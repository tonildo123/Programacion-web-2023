/* eslint-disable */
import { useEffect, useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../firebase';
import ProfileCard from '../../components/ProfileCard';
import WelcomeComponent from '../../components/welcomeComponent';
import { useSelector, useDispatch } from 'react-redux';
import { petArraySuccess } from '../../state/ArrayPetSlice';
import ModalDescription from '../../components/ModalDescription';


const Home = () => {

  const [pets, setPets] = useState([]);
  const petCollection = collection(db, "Pet");
  const dispatch = useDispatch();
  const state = useSelector(state => state)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPets = async () => {

    if (state.userPetsArray.pets.length > 0) {

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
      <Grid item key={card.id}>
        <Card sx={{ height: "320px", width: { xs: "100%", sm: "200px" }, px: 1, my: '2px' }} >
          <CardMedia
            component="img"
            alt="Card Image"
            image={card.photo}
            sx={{ width: '100%', height: '200px' }} />
          <CardContent>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap', fontWeight:'bold' }}>{card.pickname}</Typography>
          </CardContent>
          <CardActions>
            <Button
            fullWidth
              color="inherit"
              onClick={() => openModal(card)}
              sx={{ pt: 1, whiteSpace: 'nowrap', backgroundColor: '#DC7633', color: 'white' }}
            >
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
      {isModalOpen && selectedItem && (
      <ModalDescription item={selectedItem} onClose={() => closeModal()} />
      )}
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