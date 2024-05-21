import React from 'react'
import { useEffect } from 'react'
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from "react-material-ui-carousel";
import { Box, CardMedia, Typography } from "@mui/material";
import Loader1 from "../Common/Loader1"

// Import Api function area
import { banner } from '../Allreducers/bannerslice'
import Trainer from './Trainer';
import Testimonial from './Testimonial';

const Home = () => {

    const dispatch = useDispatch();


    const { bannerdata, loading } = useSelector((state) => state.mybanner);

    useEffect(() => {
        dispatch(banner())
    }, [])

    if (loading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1><Loader1 /></h1>
            </div>
        )
    }

    return (
        <>
            <Layout>

                {/*Banner Start*/}
                <Carousel autoPlay={true} interval={5000}>
                    {bannerdata?.map((data, index) => (
                        <Box key={index} position="relative" marginTop={2}>
                            <CardMedia
                                component="img"
                                src={`${process.env.REACT_APP_BASE_URL}${data.image}`}
                                style={{ objectFit: 'cover', height: '800px' }} // Adjusted object fit and height
                            />
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                textAlign="center"
                                color="white"
                                p={4}
                                bgcolor="rgba(0, 0, 0, 0.7)" // Increased opacity for better readability
                                borderRadius="10px" // Increased border radius for a smoother look
                                maxWidth="80%" // Adjusted max width for responsiveness
                            >
                                <Typography variant="h4" component="div" gutterBottom>
                                    {data.title}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    {data.subtitle}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Carousel>


                {/*Banner End*/}

                {/* Trainer Area*/}
                <Trainer />

                {/*Testimonial Area*/}
                <Testimonial />

            </Layout>
        </>
    )
}

export default Home
