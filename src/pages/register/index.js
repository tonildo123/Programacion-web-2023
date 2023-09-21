import { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Grid } from '@mui/material';
import Alert from "@mui/material/Alert";
import './style.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Outlet, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRePasswordChange = (event) => {
        setRepassword(event.target.value);
    };

    const handleRegister = async () => {

        if (password !== repassword) {
            return setError('Las contraseñas no coinciden')
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password) //registrarme
                .then(async (userCredential) => {
                    console.log(userCredential)
                    Swal.fire({
                        title: 'Usuario creado con exito',
                        text: email,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });

                    navigate('/login')
                })
                .catch((error) => {
                    console.log('error', error)
                    setError(error.message);
                })

        } catch (error) {
            console.log('error', error)
            setError(error.message);

        }
    };
    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container>
                <Grid item xs={12} sm={3} className="hidden sm:block">
                </Grid>
                <Grid item xs={12} sm={6} style={{ background: 'white' }}>
                    {error && (
                        <Alert severity="error" onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}
                    <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <Typography variant="h4" gutterBottom>
                            Registrarse
                        </Typography>
                        <form>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Correo Electrónico"
                                variant="outlined"
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Repetir Contraseña"
                                variant="outlined"
                                type="password"
                                placeholder="Ingresa nuevamente tu contraseña"
                                value={repassword}
                                onChange={handleRePasswordChange}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2, backgroundColor: '#DC7633' }}
                                onClick={handleRegister}
                            >
                                Registrarme
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} className="hidden sm:block">
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
