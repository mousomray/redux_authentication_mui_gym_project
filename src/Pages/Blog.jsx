import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../Common/Layout';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Loader1 from '../Common/Loader1';
import {blog} from '../Allreducers/blogslice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Blog = () => {
    const dispatch = useDispatch();
    const { blogdata, loading } = useSelector((state) => state.myblog);

    useEffect(() => {
        dispatch(blog());
    }, []);

    if (loading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1><Loader1 /></h1>
            </div>
        );
    }

    return (
        <>
            <Layout>
                <div className='container' style={{ marginTop: '100px' }}>
                    <h1 className='mb-5' style={{ textAlign: 'center' }}>Blog</h1>
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2} justifyContent="center">
                            {blogdata?.map((value, index) => (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                    <Card sx={{
                                        maxWidth: 550,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
                                        },
                                        border: '1px solid #E31C25',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={`${process.env.REACT_APP_BASE_URL}${value.image}`}
                                                alt="blog"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {value?.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {value?.subtitle}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Link to={`/blogdetails/${value._id}`}>
                                                <Button size="small" color="primary">
                                                    <ReadMoreIcon style={{ fontSize: '35px', color: 'red' }} />
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </Layout>
        </>
    );
}

export default Blog;
