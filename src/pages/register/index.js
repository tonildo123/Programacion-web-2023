import { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import Alert from "@mui/material/Alert";
import './style.css';
import useFirebaseRegister from '../../hooks/useFirebaseRegister';



const Register = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const { handleRegister, error, setError } = useFirebaseRegister()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRePasswordChange = (event) => {
        setRepassword(event.target.value);
    };


    return (

        <Grid container xs={{height:'500px', my:5}}>
            <Grid item xs={12} sm={3} className="hidden sm:block">
            </Grid>
            <Grid item xs={12} sm={6} sx={{ background: 'white', my:'4%'}}>
                {error != null && (
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

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
                        onClick={() => handleRegister(email, password, repassword)}
                    >
                        Registrarme
                    </Button>
                </form>

            </Grid>
            <Grid item xs={12} sm={3} className="hidden sm:block">
            </Grid>
        </Grid>
    );
};

export default Register;
