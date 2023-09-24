/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { addressSuccess } from '../state/AddressSlice';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const AddresComponent = (props) => {
  const {  idUser, street, number, department, floor, locality, province, country, latitude, longitude } = useSelector(state => state.addressuser.address);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false)
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(latitude !== null && longitude !== null);

  const [formData, setFormData] = useState({
    idUser: idUser != 0 ? idUser : state.logger.user.id,
    street: street != null ? street : '',
    number: number != null ? number : '',
    floor: floor != null ? floor : '',
    department: department != null ? department : '',
    locality: locality != null ? locality : '',
    province: province != null ? province : '',
    country: country != null ? country : '',
    latitude: latitude != null ? latitude : '',
    longitude: longitude != null ? longitude : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    exist ? UpdateAddressProfile() : SaveAddressProfile();

  };

  const UpdateAddressProfile = async () => {

    try {
      console.log(formData)
      const addressQuery = query(
        collection(db, "address"),
        where("idUser", "==", idUser)
      );
      const querySnapshot = await getDocs(addressQuery);
      const addressDoc = querySnapshot.docs[0].ref;
      await updateDoc(addressDoc, formData)

      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const pet = {
            idUser: formData.idUser,
            street: formData.street,
            number: formData.number,
            department: formData.department,
            floor: formData.floor,
            locality: formData.locality,
            province: formData.province,
            country: formData.country,
            latitude: formData.latitude,
            longitude: formData.longitude,
          }

          dispatch(addressSuccess(pet))
          navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/home');
        }
      });

    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Ocurrio un error!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',

      })

    }
  };


  const SaveAddressProfile = async () => {

    try {

      const addressCollection = collection(db, 'address');

      const docRef = await addDoc(addressCollection, formData);
      const newIdAddress = docRef.id;
      console.log(newIdAddress)
      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const pet = {
            id: newIdAddress,
            idUser: state.logger.user.id,
            street: formData.street,
            number: formData.number,
            department: formData.department,
            floor: formData.floor,
            locality: formData.locality,
            province: formData.province,
            country: formData.country,
            latitude: formData.latitude,
            longitude: formData.longitude,
          }

          dispatch(addressSuccess(pet))
          navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/home');
        }
      });

    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Ocurrio un error!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',

      })

    }

  }
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          latitude: latitude,
          longitude: longitude,
        }));
        setShowMap(true);
      });
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  };

  const getAddress = async () => {

    const addressQuery = query(
      collection(db, "address"),
      where("idUser", "==", state.logger.user.id)
    );
    const querySnapshot = await getDocs(addressQuery);

    let addressPorfile;
    querySnapshot.forEach((doc) => {
      addressPorfile = doc.data();

    });

    if (addressPorfile) {
      setFormData({
        idUser: addressPorfile.idUser,
        street: addressPorfile.street,
        number: addressPorfile.number,
        department: addressPorfile.department,
        floor: addressPorfile.floor,
        locality: addressPorfile.locality,
        province: addressPorfile.province,
        country: addressPorfile.country,
        latitude: addressPorfile.latitude,
        longitude: addressPorfile.longitude,
      });
      setExist(true)
      const address = {
        idUser: addressPorfile.idUser,
        street: addressPorfile.street,
        number: addressPorfile.number,
        department: addressPorfile.department,
        floor: addressPorfile.floor,
        locality: addressPorfile.locality,
        province: addressPorfile.province,
        country: addressPorfile.country,
        latitude: addressPorfile.latitude,
        longitude: addressPorfile.longitude,
      }

      dispatch(addressSuccess(address))

    } else {
      console.log('no found')
    }
  }



  useEffect(() => {
    getAddress();
  }, [])


  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Mi domicilio
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Calle"
              name="street"
              value={formData.street}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Altura"
              name="number"
              value={formData.number}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Piso"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Departamento"
              name="department"
              value={formData.department}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Localidad"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Provincia"
              name="province"
              value={formData.province}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Pais"
              name="country"
              value={formData.country}
              onChange={handleChange}
              margin="normal"
            />
            <Tooltip sx={{ width: '100%' }} title="Obtener ubicación">
              <IconButton onClick={handleGetLocation}>
                <PlaceIcon sx={{ fontSize: { xs: 26, sm: 30 }, color: '#DC7633', alignSelf: 'center' }} />
              </IconButton>
            </Tooltip>

            {/* <MapComponent
                latitude={formData.latitude}
                longitude={formData.longitude}
                google={props.google}
              />
             */}

            {
              showMap && <Typography sx={{ width: '100%', alignSelf: 'center' }}>Ubicacion obtenida</Typography>
            }

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, color: 'white', backgroundColor: '#DC7633', fontWeight: 'bold' }}
            >
              Guardar Cambios
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCP79j9y-SD3Nu9BYqeq0uUtH-_HBxjfEs'
})(AddresComponent);
