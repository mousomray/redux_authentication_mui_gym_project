import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ReactCardFlip from 'react-card-flip';
import { service } from '../Allreducers/serviceslice';
import Loader1 from '../Common/Loader1';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Service = () => {
    const dispatch = useDispatch();
    const { servicedata, loading } = useSelector((state) => state.myservice);
    const [isFlipped, setIsFlipped] = useState([]);

    useEffect(() => {
        dispatch(service());
    }, []);

    const handleFlip = (index) => {
        setIsFlipped((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    if (loading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1><Loader1 /></h1>
            </div>
        );
    }

    return (
        <Layout>
            <div className="container" style={{ marginTop: '100px' }}>
                <h1 className="mb-5" style={{ textAlign: 'center' }}>
                    Service
                </h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} justifyContent="center">
                        {servicedata?.map((value, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <ReactCardFlip
                                    isFlipped={isFlipped[index] || false}
                                    flipDirection="vertical"
                                >
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            border: '1px solid #E31C25',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={`${process.env.REACT_APP_BASE_URL}${value.image}`}
                                                alt="service_image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {value?.service_name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {value?.service_description.slice(0, 200)}...
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => handleFlip(index)}
                                            >
                                                Trainer
                                            </Button>
                                            <Link to={`/servicedetails/${value._id}`}>
                                                <Button size="small" color="primary">
                                                    Details
                                                </Button>
                                            </Link>
                                            {/* <Link to={`/booking/${value._id}`}>
                                                <Button size="small" color="primary">
                                                    Booking
                                                </Button>
                                            </Link> */}
                                        </CardActions>
                                    </Card>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            border: '1px solid #E31C25',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {value?.trainer_details?.map((item, innerIndex) => (
                                            <React.Fragment key={innerIndex}>
                                                <CardContent>
                                                    <CardMedia
                                                        component="img"
                                                        height="400"
                                                        image={`${process.env.REACT_APP_BASE_URL}${item.image}`}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {item?.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <b>Speciality : </b>{item?.speciality} <br />
                                                            <b>Experience : </b>{item?.experience}
                                                        </Typography>
                                                    </CardContent>
                                                </CardContent>
                                                <CardActions>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handleFlip(index)}
                                                    >
                                                        Service
                                                    </Button>
                                                </CardActions>
                                            </React.Fragment>
                                        ))}
                                    </Card>
                                </ReactCardFlip>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </Layout>
    );
};

export default Service;
