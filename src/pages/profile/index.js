import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, uploadFile } from '../../firebase';
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
  const [imagesName, setImagesName] = useState();
  const [imageData, setImageData] = useState('https://e7.pngegg.com/pngimages/223/244/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-rectangle.png');
  const navigate = useNavigate();
  const profileCollection = collection(db, 'ProfileUsers');
  const [isCapturing, setIsCapturing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    console.log('state : ', JSON.stringify(state));
  }, []);



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
    const blob = dataURLtoBlob(imageSrc);
    setImageData(imageSrc);
    setIsFormValid(pickname !== '' && true);
    setIsCapturing(false);
  };

  const store = async (e) => {
    e.preventDefault();
    try {

      const url = await uploadFile(imageData, imagesName, 'ProfileFolder')

      const profileDoc = doc(db, 'ProfileUsers', id)
      const data = { name: pickname, lastName: lastName, avatar: url }
      await updateDoc(profileDoc, data)

      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const user = {
            avatar: url,
            name: pickname,
            lastName: lastName,
            numberPhone: numberPhone
          }

          dispatch(profileSuccess(user))
          navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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
      <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FAD7A0', pt: '1%' }}>
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
                sx={{ marginTop: 2, backgroundColor: '#DC7633' }} onClick={store}>Guardar cambios</Button>
            </CardActions>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sx={{ display: 'flex', backgroundColor:'#FEF5E7', justifyContent: 'center', alignItems: 'center' }}>
        Publicidad
      </Grid>
    </Grid>
  );
};

export default Profile;
