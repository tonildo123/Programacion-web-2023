import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, uploadFile } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { CardMedia, Grid, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import ProfileCard from '../../components/ProfileCard';
import Swal from 'sweetalert2'
import Webcam from 'react-webcam'; // Import Webcam
import { profileSuccess } from '../../state/Profileslice';

const Profile = () => {

  const dispatch = useDispatch()
  const webcamRef = useRef(null);
  const { id } = useSelector(state => state.logger.user)
  const { name, lastName, numberPhone, avatar } = useSelector(state => state.profileuser.profile)
  const [pickname, setPickname] = useState(name != null ? name : '');
  const [lastNameState, setlastName] = useState(lastName != null ? lastName : '');
  const [numberPhoneState, setnumberPhone] = useState(numberPhone != null ? numberPhone : '');
  const [imagesName, setImagesName] = useState();
  const [imageData, setImageData] = useState(avatar != null ? avatar : 'https://via.placeholder.com/200x200');
  const navigate = useNavigate();
  const [isCapturing, setIsCapturing] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(false);
  const [isMismaImagen, setIsMismaImagen] = useState(true);


  const openImagePicker = () => {
    Swal.fire({
      title: 'Seleccionar imagen',
      showCancelButton: true,
      confirmButtonText: 'Tomar foto',
      cancelButtonText: 'Seleccionar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsCapturing(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        document.getElementById('upload-button').click();
      }
    });
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const timestamp = new Date().getTime(); // Genera un timestamp único
    const imageName = `captured_${timestamp}.png`; // Nombre de la imagen
    const blob = dataURLtoBlob(imageSrc);
    setImageData(blob);
    // setIsFormValid(pickname !== '' && true);
    setIsCapturing(false);
    setImagesName(imageName);
    setIsMismaImagen(false);

  };


  const store = async (e) => {
    e.preventDefault();

    try {
      // Consulta para buscar el documento por "idUser"
      const profileQuery = query(
        collection(db, "ProfileUsers"),
        where("idUser", "==", id)
      );

      // Realiza la consulta
      const querySnapshot = await getDocs(profileQuery);

      if (!querySnapshot.empty) {
        // Si se encuentra al menos un documento, actualiza el primer documento que cumple con el filtro
        const profileDoc = querySnapshot.docs[0].ref; // Obtener la referencia del documento

        const url = isMismaImagen ? avatar : await uploadFile(imageData, imagesName, 'ProfileFolder');

        // Datos que deseas actualizar
        const dataToUpdate = {
          name: pickname,
          lastName: lastNameState,
          avatar: url,
          numberPhone: numberPhoneState,
        };

        await updateDoc(profileDoc, dataToUpdate);
        const user = {
          idUser: id,
          avatar: url,
          name: pickname,
          lastName: lastNameState,
          numberPhone: numberPhoneState,
        };

        dispatch(profileSuccess(user));
      } else {
        const profileCollection = collection(db, 'ProfileUsers');

        const url = await uploadFile(imageData, imagesName, 'ProfileFolder');

        const dataToCreate = {
          idUser: id,
          name: pickname,
          lastName: lastNameState,
          avatar: url,
          numberPhone: numberPhoneState,
        };

        await addDoc(profileCollection, dataToCreate);

        const user = {
          idUser: id,
          avatar: url,
          name: pickname,
          lastName: lastNameState,
          numberPhone: numberPhoneState,
        };

        dispatch(profileSuccess(user));
      }

      Swal.fire({
        title: 'Guardado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/home');
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Ocurrió un error!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }

  };

  const changeInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageData(file)
        const fileName = file.name;
        setImagesName(fileName)
        setIsMismaImagen(false)
        // setIsFormValid(pickname !== '' && true);

        

      } else {
        alert('El archivo seleccionado no es una imagen.');
      }
    } else {
      alert('No se ha seleccionado ningún archivo.');
    }
  };



  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (

    <Grid container >
      <Grid item xs={12} sm={3} sx={{ backgroundColor: '#FEF5E7', }}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FAD7A0' }}>
        <Card sx={{
          backgroundColor: '#FAD7A0', maxWidth: '100%', display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '1%',
        }}>
          {isCapturing ? (
            <div>
              <Webcam
                ref={webcamRef}
                audio={false}
                width="100%"
                height={200}
              />
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2, backgroundColor: '#DC7633' }}
                  onClick={captureImage}
                >
                  Capturar
                </Button>
              </CardActions>
            </div>
          ) : (
            <CardMedia
              sx={{
                height: 250,
                width: 200,
                backgroundSize: 'fill',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              title="Captured Image"
            >
              <div
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'inline-block',
                }}
              >
                {typeof imageData === 'string' ? (
                  <img
                    src={imageData}
                    alt="Imagen"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imageData)}
                    alt="Imagen"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </div>
            </CardMedia>
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <CardContent>
              <input
                type="file"
                multiple
                onChange={changeInput}
                style={{ display: 'none' }}
                id="upload-button"
              />
              <Button size="small" onClick={openImagePicker}>
                SELECCIONAR IMAGEN
              </Button>
              {!isMismaImagen && <Typography variant="h6">{imagesName}</Typography>}
            </CardContent>
            <CardContent>
              <input
                type="text"
                value={pickname}
                onChange={(e) => setPickname(e.target.value)}
                placeholder="Nombre"
              />
            </CardContent>
            <CardContent>
              <input
                type="text"
                value={lastNameState}
                onChange={(e) => setlastName(e.target.value)}
                placeholder="Apellido"
              />
            </CardContent>
            <CardContent>
              <input
                type="number"
                value={numberPhoneState}
                onChange={(e) => setnumberPhone(e.target.value)}
                placeholder="Telefono"
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={pickname.trim() === ''}
                sx={{ marginTop: 2, backgroundColor: '#DC7633' }} onClick={store}>Guardar cambios</Button>
            </CardActions>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', backgroundColor: '#FEF5E7', justifyContent: 'center', alignItems: 'center' }}>
        Publicidad
      </Grid>
    </Grid>
  );
};

export default Profile;
