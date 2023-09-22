import { CardMedia, Grid, Card, Button, Typography } from '@mui/material';

const ModalDescription = ({ item, onClose }) => {


    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} sm={8} sx={{ backgroundColor: '#FAD7A0' }}>                
                    <Button fullWidth sx={{alignItems:'flex-end'}} onClick={() => onClose()}>X</Button>
                <Card
                    sx={{
                        backgroundColor: '#FAD7A0', maxWidth: '100%', display: 'flex',
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '1%',
                    }}>

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

                            <img
                                src={item.photo}
                                alt="Imagen"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                }}
                            />

                        </div>
                    </CardMedia>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Typography variant="h6">{item.pickname}</Typography>
                    </div>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ModalDescription;
