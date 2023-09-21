import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { profileSuccess } from "../state/Profileslice";
import { NavLink } from "react-router-dom";

export default function ProfileCard() {

  const state = useSelector(state => state)
  const { id } = useSelector(state => state.logger.user)
  const { name, lastName, numberPhone, status, avatar } = useSelector(state => state.profileuser.profile)
  const dispatch = useDispatch()

  const [foto, setFoto] = useState('https://via.placeholder.com/200x200')
  const [nombre, setNombre] = useState('Mi nombre')
  const [apellido, setApellido] = useState('Apellido')
  const [telefono, setTelefono] = useState()


  const getProfileUsers = async () => {

    const patientsQuery = query(
      collection(db, "ProfileUsers"),
      where("idUser", "==", id)
    );
    const querySnapshot = await getDocs(patientsQuery);

    let selectedProfile;
    querySnapshot.forEach((doc) => {
      // console.log('que hay', doc.data())
      selectedProfile = doc.data();

    });
    // SI EXISTE EN FIRESTORE LO MUESTRA
    if (selectedProfile) {
      // console.log('the one', selectedProfile)
      const user = {
        avatar: selectedProfile.avatar,
        name: selectedProfile.name,
        lastName: selectedProfile.lastName,
        numberPhone: selectedProfile.numberPhone
      }

      dispatch(profileSuccess(user))

    } else {
      // console.log('no found')
    }

  }

  useEffect(() => {
    getProfileUsers()
    // console.log('state : ', state)
  }, [])

  useEffect(() => {
    if (status != null) {
      setApellido(lastName)
      setFoto(avatar)
      setNombre(name)
      setTelefono(numberPhone)
    }
  }, [status])


  return (
    <Card sx={{ margin: '5'}}>
      <CardMedia
        component="img"
        image={foto}
        alt="Imagen Usuario"
        sx={{ borderRadius: '50%', maxHeight: "200px", maxWidth: "200px", marginX: "auto", paddingTop: "1em"}} // Estilo para la imagen redondeada
      />
      <CardContent sx={{ textAlign: 'center' }}> {/* Centrar el contenido */}
        <Typography variant="h2">
          {nombre} {apellido}
        </Typography>
        <Typography variant="h3">
          {telefono}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth
          variant="contained"
          color="primary"
          component={NavLink}
          to="/profile/edit"
          sx={{ marginTop: 2, backgroundColor: '#DC7633' }}
        >Editar</Button>
      </CardActions>
    </Card>

  );
}
