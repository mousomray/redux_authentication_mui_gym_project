import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { showbooking } from '../Allreducers/showbookingslice';
import Layout from '../Common/Layout';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Dashboard = () => {

    const dispatch = useDispatch();
    const { showbookingdata, loading } = useSelector((state) => state.myshowbooking);
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const phone = localStorage.getItem("phone")
    const id = localStorage.getItem("id")

    console.log("My iddd is", id);

    useEffect(() => {
        dispatch(showbooking(id));
    }, [])

    console.log("Shhhhhhhh", showbookingdata);

    return (
        <Layout>
            <section style={{ margin: '2rem' }}>
                <div className="container-fluid py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <Card sx={{ borderRadius: '1rem', margin: '2rem' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} xl={5} sx={{ backgroundColor: red[500], color: 'white', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                                        <Avatar sx={{ width: 120, height: 110 }} src="https://cdn-icons-png.flaticon.com/128/219/219970.png"/>
                                        <Typography variant="h4" align="center" gutterBottom>{name}</Typography>
                                        <Typography variant="h4" align="center" gutterBottom>{email}</Typography>
                                        <Typography variant="h4" align="center" gutterBottom>{phone}</Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Link to="https://www.facebook.com/"><FacebookIcon sx={{ fontSize: '2rem', color: 'white', mx: 1 }} /></Link>
                                            <Link to="https://www.twitter.com/"><TwitterIcon sx={{ fontSize: '2rem', color: 'white', mx: 1 }} /></Link>
                                            <Link to="https://www.instagram.com/"><InstagramIcon sx={{ fontSize: '2rem', color: 'white', mx: 1 }} /></Link>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} xl={7} sx={{ backgroundColor: 'black', color: 'white' }}>
                                        <CardContent>
                                            <Typography variant="h4" gutterBottom sx={{color:'white'}}>Your Booking Status...</Typography>
                                            <hr style={{ borderTop: '1px solid white' }} />
                                            {showbookingdata?.result?.map((item, index) => (
                                                <div key={index}>
                                                    <Typography variant="h6" gutterBottom>Training Name : <b>{item?.serviceId?.service_name}</b></Typography>
                                                    <Typography variant="h6" gutterBottom>Status: {item?.isPending ? <b>Pending...<span>&#8987;</span></b> : <span>Approved <span>&#9989;</span></span>}</Typography>
                                                    <hr />
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex', justifyContent: 'start' }}>
                                                <i className="far fa-edit mb-5" />
                                            </div>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Dashboard;
