import { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import Alert from "@mui/material/Alert";
import './style.css';
import { useDispatch } from 'react-redux';
import { loggearme } from '../../state/LoginSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink } from 'react-router-dom';



const Login = () => {
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

    const handleLogin = async () => {

        try {
            await signInWithEmailAndPassword(auth, email, password) 
                .then(async (userCredential) => {
                    const user = {
                        id: userCredential.user.uid,
                        email: email,
                        password: password
                    }
                    distpach(loggearme(user))
                })
                .catch((error) => {
                    setError(error.message);
                })

        } catch (error) {
            setError(error.message);

        }

    };
    return (
            <Grid container xs={{height:'500px', my:5}}>
                <Grid item xs={12} sm={3} className="hidden sm:block">
                </Grid>
                <Grid item xs={12} sm={6} sx={{ background: 'white', my:'4%'}}>
                    {error && (
                        <Alert severity="error" onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}
                    
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
                                onClick={handleLogin}
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
                </Grid>
                <Grid item xs={12} sm={3} className="hidden sm:block">
                </Grid>
            </Grid>
        
    );
};

export default Login;
