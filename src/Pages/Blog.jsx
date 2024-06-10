import React, { useState, useEffect } from 'react';
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
import { blog } from '../Allreducers/blogslice';
import ReactPaginate from 'react-paginate'; // Import React Paginate

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
    const [currentPage, setCurrentPage] = useState(1); // For Pagination 
    const [postPerPage] = useState(2); // For Pagination 

    // Handle For Pagination
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };

    // Add Filter For Pagination
    const filteredBlogData = blogdata.filter((blogItem) => blogItem.status === '1');
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = filteredBlogData?.slice(indexOfFirstPost, indexOfLastPost);

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

                {/*Banner Start*/}
                <div
                    style={{
                        position: "relative",
                        marginBottom: "15px",
                        marginTop: "65px",
                        width: "100%",
                        height: "400px",
                    }}
                >
                    <video
                        src="/video/blog.mp4"
                        autoPlay
                        loop
                        muted
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            zIndex: 1,
                        }}
                    >
                        Blog
                    </Typography>
                </div>

                {/*Banner End*/}

                <div className='container' style={{ marginTop: '100px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={2} justifyContent="center">
                            {currentPosts?.map((value, index) => (
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
                                        backgroundColor: 'black',
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={`${process.env.REACT_APP_BASE_URL}${value.image}`}
                                                alt="blog"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" sx={{color:'red'}}>
                                                    {value?.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{color:'white'}}>
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

                    {/* Pagination Pointer Area Start*/}
                    <div className="col-lg-12 my-4 pb-3">
                        <nav aria-label="Page navigation">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageCount={Math.ceil(filteredBlogData?.length / postPerPage)}
                                previousLabel="< previous"
                                activeClassName={'active'}
                                containerClassName={'pagination justify-content-center mb-4'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                breakClassName={'page-item disabled'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link pointer'}
                            />
                        </nav>
                    </div>
                    {/* Pagination Pointer Area End*/}
                </div>
            </Layout>
        </>
    );
}

export default Blog;
