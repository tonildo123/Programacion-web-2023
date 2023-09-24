/* eslint-disable */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { profileSuccess } from "../state/Profileslice";
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from "react-router-dom";

export default function ProfileCard() {

  const state = useSelector(state => state)
  const { id } = useSelector(state => state.logger.user)
  const { name, lastName, numberPhone, status, avatar } = useSelector(state => state.profileuser.profile)
  const dispatch = useDispatch()
  const [foto, setFoto] = useState(avatar != null ? avatar : 'https://via.placeholder.com/200x200')
  const [nombre, setNombre] = useState(name != null ? name : 'Mi nombre')
  const [apellido, setApellido] = useState(lastName != null ? lastName : 'Apellido')
  const [telefono, setTelefono] = useState(numberPhone != null ? numberPhone : '')


  const getProfileUsers = async () => {

    const profileQuery = query(
      collection(db, "ProfileUsers"),
      where("idUser", "==", id)
    );
    const querySnapshot = await getDocs(profileQuery);

    let selectedProfile;
    querySnapshot.forEach((doc) => {
      selectedProfile = doc.data();

    });
    // SI EXISTE EN FIRESTORE LO MUESTRA
    if (selectedProfile) {
      // console.log('the one', selectedProfile)
      const user = {
        idUser: id,
        avatar: selectedProfile.avatar,
        name: selectedProfile.name,
        lastName: selectedProfile.lastName,
        numberPhone: selectedProfile.numberPhone
      }

      dispatch(profileSuccess(user))

    } else {
      console.log('no found')
    }

  }


  useEffect(() => {
    getProfileUsers()

    if (status != null) {
      setApellido(lastName)
      setFoto(avatar)
      setNombre(name)
      setTelefono(numberPhone)
    }
  }, [status])


  return (
    <Card sx={{ margin: '5' }}>
      <CardMedia
        component="img"
        image={foto}
        alt="Imagen Usuario"
        sx={{ borderRadius: '50%', maxHeight: "200px", maxWidth: "200px", marginX: "auto", paddingTop: "1em" }} // Estilo para la imagen redondeada
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h4">
          {nombre} {apellido}
        </Typography>
        <Typography variant="h6">
          {telefono}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item sx={{width:'100%'}}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={NavLink}
              to="/profile/edit"
              sx={{ backgroundColor: '#DC7633', fontWeight:'bold' }}
            >
              Editar
            </Button>
          </Grid>
          <Grid item>
            <Tooltip title="Ver domicilio">
              <IconButton component={NavLink} to="/profile/address">
                <PlaceIcon sx={{ fontSize: { xs: 26, sm: 30 }, color: '#DC7633' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>

    </Card>

  );
}
