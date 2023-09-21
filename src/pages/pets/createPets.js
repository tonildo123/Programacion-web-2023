import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { CardMedia, Container, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import ProfileCard from '../../components/ProfileCard';
import Swal from 'sweetalert2'
import Webcam from 'react-webcam'; // Import Webcam

const Create = () => {


  const webcamRef = useRef(null);
  const state = useSelector(state => state);
  const { id } = useSelector(state => state.logger.user)
  const [pickname, setPickname] = useState('');
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState('https://via.placeholder.com/200x200');
  const navigate = useNavigate();
  const petCollection = collection(db, 'Pet');
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
      await addDoc(petCollection, { pickname: pickname, photo: imageData, idUser: id });
      Swal.fire({
        title: 'Guadado exitosamente!',
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

    <Grid container>
      <Grid item xs={12} sm={3} sx={{ backgroundColor: '#FEF5E7' }}>
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
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isFormValid}
                sx={{ marginTop: 2, backgroundColor: '#DC7633' }} onClick={store}>Guardar</Button>
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

export default Create;
