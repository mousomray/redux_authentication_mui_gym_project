import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Select, MenuItem, Button, Box, Typography, Grid, Paper, Avatar, CssBaseline, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux';
import { booking } from '../Allreducers/bookingslice'
import { useParams } from 'react-router-dom';
import { servicedetail } from '../Allreducers/servicedetailslice'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();



const Booking = () => {

    const { id } = useParams()
    const dispatch = useDispatch();
    const { servicedetaildata } = useSelector((state) => state.myservicedetail);
    const name = localStorage.getItem('name');
    //const memberId = localStorage.getItem('_id');
    const email = localStorage.getItem('email');
    const [scheme, setScheme] = useState('');
    const [price, setPrice] = useState('0');

    console.log("Servissssss", servicedetaildata);



    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(booking());
            console.log("My Booking Response is ", response);
            if (response && response?.payload?.status === 200) {
                // navigate('/showproduct')

            } else {

            }
        } catch (error) {
            console.log(error);

        }

    };

    useEffect(() => {
        dispatch(servicedetail(id));
    }, []);


    useEffect(() => {
        if (scheme) {
            switch (scheme) {
                case "Yearly":
                    setPrice("12000");
                    break;
                case "Half-yearly":
                    setPrice("8000");
                    break;
                case "Quarterly":
                    setPrice("3500");
                    break;
                default:
                    setPrice("0");
            }
        }
    }, [scheme]);

    return (
        <>
            <Layout>
                <ThemeProvider theme={defaultTheme}>
                    <Grid container component="main" sx={{ height: '100vh', marginTop: '70px' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: 'url(https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?cs=srgb&dl=pexels-leonardho-1552252.jpg&fm=jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundImage: 'url(https://i.pinimg.com/736x/a1/8c/7b/a18c7b4e53bfb3b8f2b6322b0a878a4e.jpg)' }}>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <EditIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Book Your Service
                                </Typography>
                                <h4 className='mb-4'>Start Your {servicedetaildata.service_name} Journey Now</h4>
                                <Box component="form" onSubmit={handleOnSubmit} noValidate sx={{ mt: 1 }}>

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        defaultValue={name}
                                        autoComplete="name"
                                        autoFocus
                                        InputProps={{
                                            readOnly: true // Add this line to make the field unmodifiable
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        defaultValue={email}
                                        autoComplete="email"
                                        autoFocus
                                        InputProps={{
                                            readOnly: true // Add this line to make the field unmodifiable
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="training"
                                        label="Training"
                                        name="training"
                                        value={servicedetaildata.service_name}
                                        autoComplete="training"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}

                                        InputProps={{
                                            readOnly: true // Add this line to make the field unmodifiable
                                        }}
                                    />

                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        displayEmpty
                                        defaultValue=""
                                        // {...register('scheme')}
                                        onChange={(e) => setScheme(e.target.value)}
                                    >
                                        <MenuItem value="" disabled>Select Your Scheme</MenuItem>
                                        <MenuItem value="Yearly">Yearly</MenuItem>
                                        <MenuItem value="Half-yearly">Half-yearly</MenuItem>
                                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                                    </Select>

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="price"
                                        label="Price"
                                        value={price}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Book
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Layout>
        </>
    )
}

export default Booking
