import { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Grid } from '@mui/material';
import Alert from "@mui/material/Alert";
import './style.css';
import { useDispatch } from 'react-redux';
import { loggearme } from '../../state/LoginSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink } from 'react-router-dom';



const ForgotPassword = () => {
    const distpach = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleForgotPassword = async () => {
        console.log('Correo Electrónico:', email);
        console.log('Contraseña:', password);



        try {
            await signInWithEmailAndPassword(auth, email, password) // Iniciar sesión
                .then(async (userCredential) => {
                    console.log(userCredential)
                    const user = {
                        id: userCredential.user.uid,
                        email: email,
                        password: password
                    }
                    distpach(loggearme(user))
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
                            Iniciar Sesión
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2, backgroundColor: '#DC7633' }}
                                onClick={handleForgotPassword}
                            >
                                Iniciar Sesión
                            </Button>
                        </form>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ marginTop: 2, backgroundColor: 'white', color: '#A04000 ' }}
                            component={NavLink}
                            to="/forgotpassword"
                        >
                            Recuperar contraseña
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3} className="hidden sm:block">
                </Grid>
            </Grid>
        </Container>
    );
};

export default ForgotPassword;
