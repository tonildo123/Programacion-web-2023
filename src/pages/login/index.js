import {useState} from 'react';
import { TextField, Button, Container, Paper, Typography, Grid } from '@mui/material';
import './style.css';
import { useDispatch } from 'react-redux';
import { loggearme } from '../../state/LoginSlice';

const Login = () => {
    const distpach = useDispatch()

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        console.log('Correo Electrónico:', email); 
        console.log('Contraseña:', password); 

        const user = {
            id:38116097,
            email: email, 
            password: password
        }
        distpach(loggearme(user))

    };
    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center'}}>
            <Grid container>
                <Grid item xs={12} sm={3} className="hidden sm:block">
                </Grid>
                <Grid item xs={12} sm={6} style={{ background: '#F8C471' }}>
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
                                sx={{ marginTop: 2, backgroundColor: '#DC7633'  }}
                                onClick={handleLogin}
                            >
                                Iniciar Sesión
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

export default Login;
