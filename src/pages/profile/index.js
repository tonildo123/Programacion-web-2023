import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { CardMedia, Container, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import ProfileCard from '../../components/ProfileCard';
import Swal from 'sweetalert2'
import Webcam from 'react-webcam'; // Import Webcam
import { profileSuccess } from '../../state/Profileslice';

const Profile = () => {

  const dispatch = useDispatch()
  const webcamRef = useRef(null);
  const state = useSelector(state => state);
  const { id } = useSelector(state => state.logger.user)
  const [pickname, setPickname] = useState('');
  const [lastName, setlastName] = useState('');
  const [numberPhone, setnumberPhone] = useState('');
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState('https://e7.pngegg.com/pngimages/223/244/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-rectangle.png');
  const navigate = useNavigate();
  const profileCollection = collection(db, 'ProfileUsers');
  const [isCapturing, setIsCapturing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    console.log('state : ', JSON.stringify(state));
  }, []);

  const convertirBase64 = (archivos) => {
    Array.from(archivos).forEach(archivo => {
      let reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        let base64 = reader.result;
        setImageData(base64);
      };
    });
  };

  const openImagePicker = () => {
    Swal.fire({
      title: 'Seleccionar imagen',
      // icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Tomar foto',
      cancelButtonText: 'Seleccionar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle "Tomar foto" option
        setIsCapturing(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        document.getElementById('upload-button').click(); // Trigger file input click for "Seleccionar" option
      }
    });
  };
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the captured image source (e.g., convert it to base64)
    const blob = dataURLtoBlob(imageSrc);
    convertirBase64(blob);
    setImageData(imageSrc); // Actualiza el estado con la imagen capturada
    setIsFormValid(pickname !== '' && true); 
    setIsCapturing(false);
  };

  const store = async (e) => {
    e.preventDefault();
    try {

      const profileDoc = doc(db, 'ProfileUsers', id)
      const data = { name: pickname,lastName:lastName, avatar: imageData}
      await updateDoc(profileDoc, data)
      
      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',
        
      }).then((result) => {
        if (result.isConfirmed) {
          const user = {
            avatar : imageData,
            name: pickname,
            lastName: lastName,
            numberPhone: numberPhone
        }

        dispatch(profileSuccess(user))
        navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel){
          navigate('/home');
        }
      });
      
    } catch (error) {

      Swal.fire({
        title: 'Ocurrio un error!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
        
      })
      
    }
    
  };

  const changeInput = (e) => {
    let indexImg;
    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }

    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...images, ...newImgsToState];
    imageData(newImgsState);
  };

  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;
    convertirBase64(e.currentTarget.files);

    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];
      let url = URL.createObjectURL(file);

      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file
      });

      indexInicial++;
    });

    return arrayImages;
  }

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setPickname(newNickname);
    setIsFormValid(newNickname !== '' && (imageData || isCapturing));
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
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'flex-start' }} maxWidth="xl" style={{ padding: 0 }}>
      <Grid container>
        <Grid item xs={12} sm={3} className="hidden sm:block" sx={{ backgroundColor: '#FAD7A0' }}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FAD7A0' }}>
          <Card sx={{ backgroundColor: '#FAD7A0', maxWidth: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
          {isCapturing ? (
              <div>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  width={640}
                  height={480}
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
                sx={{ height: 300, backgroundSize: 'contain', backgroundImage: `url(${imageData})` }}
                title="Captured Image"
              />
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
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Apellido"
                />
              </CardContent>
              <CardContent>
                <input
                  type="number"
                  value={numberPhone}
                  onChange={(e) => setnumberPhone(e.target.value)}
                  placeholder="Telefono"
                />
              </CardContent>
              <CardActions>
                <Button 
                fullWidth
                variant="contained"
                color="primary"
                // disabled={!isFormValid}
                sx={{ marginTop: 2, backgroundColor: '#DC7633' }} onClick={store}>Guardar cambios</Button>
              </CardActions>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} className="hidden sm:block" sx={{ height: '100vh', display: 'flex', backgroundColor: '#F8C471', justifyContent: 'center', alignItems: 'center' }}>
          Publicidad
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;