import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db, uploadFile } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { CardMedia, Box, Grid, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import ProfileCard from '../../components/ProfileCard';
import Swal from 'sweetalert2'
import Webcam from 'react-webcam'; // Import Webcam
import { petSuccess } from '../../state/PetSlice';

const ModalDescription = () => {

    const dispatch = useDispatch()
    const webcamRef = useRef(null);
    const { id, idUser, pickname, photo } = useSelector(state => state.petuser.pet)
    const [picknameSatet, setPickname] = useState(pickname != null ? pickname : '');
    const [imageData, setImageData] = useState(photo != null ? photo : 'https://via.placeholder.com/200x200');
    const navigate = useNavigate();
    const [isCapturing, setIsCapturing] = useState(false);
    const [mismaImagen, setMismaIamgen] = useState(true);
    const [imagesName, setImagesName] = useState();



    const openImagePicker = () => {
        Swal.fire({
            title: 'Seleccionar imagen',
            showCancelButton: true,
            confirmButtonText: 'Tomar foto',
            cancelButtonText: 'Seleccionar',
        }).then((result) => {
            if (result.isConfirmed) {
                setIsCapturing(true);// Handle "Tomar foto" option
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                document.getElementById('upload-button').click(); // Trigger file input click for "Seleccionar" option
            }
        });
    };

    {/*saco foto con camara*/ }
    const captureImage = () => {
        setMismaIamgen(false)
        const imageSrc = webcamRef.current.getScreenshot();
        const timestamp = new Date().getTime(); // Genera un timestamp único
        const imageName = `captured_${timestamp}.png`; // Nombre de la imagen
        setImagesName(imageName)
        const blob = dataURLtoBlob(imageSrc);
        setImageData(blob);
        setIsCapturing(false);
    };

    const store = async () => {
        // e.preventDefault();

        try {
            const petDocument = doc(db, 'Pet', id)

            const url = mismaImagen ? photo : await uploadFile(imageData, imagesName, 'PetsFolder');

            // Datos que deseas actualizar
            const dataToUpdate = {
                id: id,
                idUser: idUser,
                pickname: picknameSatet,
                photo: url,
            };

            // Actualiza el documento existente
            await updateDoc(petDocument, dataToUpdate);
            const pet = {
                id: id,
                idUser: idUser,
                pickname: picknameSatet,
                photo: url,
            }

            dispatch(petSuccess(pet))


            // Realiza las operaciones adicionales necesarias después de la actualización o creación del documento

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
                setMismaIamgen(false)

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

        <Grid container>
            <Grid item xs={12} sm={3} sx={{ backgroundColor: '#FEF5E7' }}>
                <ProfileCard />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ backgroundColor: '#FAD7A0' }}>
                <Card
                    sx={{
                        backgroundColor: '#FAD7A0', maxWidth: '100%', display: 'flex',
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '1%',
                    }}>
                    {isCapturing ? (
                        <Box>
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
                        </Box>
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
                            {!mismaImagen && <Typography variant="h6">{imagesName}</Typography>}
                            <Button size="small" onClick={openImagePicker}>
                                SELECCIONAR IMAGEN
                            </Button>
                        </CardContent>
                        <CardContent>
                            <input
                                type="text"
                                value={picknameSatet}
                                onChange={(e) => setPickname(e.target.value)}
                                placeholder="Nombre"
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                // disabled={!isFormValid}
                                sx={{ marginTop: 2, backgroundColor: '#DC7633' }} onClick={() => { store() }}>Guardar cambios</Button>
                        </CardActions>
                    </div>
                </Card>
                <Button
                    fullWidth
                    component={NavLink}
                    to="/pets/mis-mascotas"
                    sx={{ backgroundColor: 'white', color: '#DC7633', fontWeight: 'bold' }}>Ver mis mascotas</Button>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', backgroundColor: '#FEF5E7', justifyContent: 'center', alignItems: 'center' }}>
                Publicidad
            </Grid>
        </Grid>
    );
};

export default ModalDescription;
