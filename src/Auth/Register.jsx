import React from 'react'
import { useState,useEffect } from 'react';
import Layout from '../Common/Layout'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../Auth/authslice';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Avatar, Grid, CssBaseline, TextField, Button, Box, FormControlLabel, Checkbox, Paper } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
 import Loader2 from '../Common/Loader2';

const initialValue = {
    name: "",
    email: "",
    password: "",
    phone: "",
    answer: "",
    image: "",
}

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { redirectReg, loading } = useSelector((state) => state?.Auth);
    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState({});
    const [image, setImage] = useState(null);

    const validation = () => {
        let error = {};

        if (!user.name) {
            error.name = 'Name is Required';
        }

        if (!user.email) {
            error.email = 'Email is Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            error.email = 'Invalid Email';
        }

        if (!user.password) {
            error.password = 'Password is required';
        } else if (user.password.length < 8) {
            error.password = 'Password must be atleast 8 characters'
        }

        if (!user.phone) {
            error.phone = 'Phone is required';
        } else if (user.phone.length != 10) {
            error.phone = 'Phone must be 10 characters'
        }

        if (!user.answer) {
            error.answer = 'Answer is Required';
        }

        return error;
    };

    const postUserData = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (!value) {
            setError({ ...error, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is Required` });
        } else {
            setError({ ...error, [name]: '' });
        }
    };

    const SubmitInfo = (e) => {
        e.preventDefault();
        const ErrorList = validation();
        setError(ErrorList);

        if (Object.keys(ErrorList).length === 0) {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('phone', user.phone);
            formData.append('answer', user.answer);
            formData.append('image', image);
            dispatch(registerUser(formData));
            setUser(initialValue);
            setImage('');
        }
    };

    // For Redirect which is part of Authentication (Start) 
    const redirectUser = () => {
        const name = localStorage.getItem('name');
        const isInLoginPage = window.location.pathname.toLowerCase() === '/register';
        if (name !== null && name !== undefined && name !== '') {
            isInLoginPage && navigate('/login');
        }
    };

    useEffect(() => {
        redirectUser();
    }, [redirectReg]);
    // For Redirect which is part of Authentication (End) 

    return (
        <>
            <Layout>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper elevation={3} sx={{ padding: 4, marginTop: 15 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', margin: 'auto' }}>
                            <AppRegistrationIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
                            Register
                        </Typography>
                        <Box component="form" onSubmit={SubmitInfo} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                type="text"
                                autoFocus
                                value={user.name}
                                onChange={postUserData}
                                error={!!error.name}
                                helperText={error.name}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={postUserData}
                                error={!!error.email}
                                helperText={error.email}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={user.password}
                                onChange={postUserData}
                                error={!!error.password}
                                helperText={error.password}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                type="number"
                                value={user.phone}
                                onChange={postUserData}
                                error={!!error.phone}
                                helperText={error.phone}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="answer"
                                label="Answer"
                                name="answer"
                                type="text"
                                autoFocus
                                value={user.answer}
                                onChange={postUserData}
                                error={!!error.answer}
                                helperText={error.answer}
                            />


                            {/*This form section is for the submit image*/}
                            <div style={{ marginBottom: '20px' }}>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                {image !== "" && image !== undefined && image !== null ? (
                                    <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                ) : (
                                    <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                )}
                            </div>
                            {/*Image area end*/}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                {loading ? <Loader2 /> : 'Register'}
                                
                            </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Already have an account? Login
                                    </Link>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>
                </Container>
            </Layout>
        </>
    )
}

export default Register
