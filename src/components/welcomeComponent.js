
import { Button, Paper, Typography } from '@mui/material';

const welcomeComponent = () => {
    return (
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Bienvenido
            </Typography>
            <Typography variant="h4" gutterBottom>
                a Mi Mascota
            </Typography>
            <Button>Empezar</Button>
        </Paper>
    )
}

export default welcomeComponent