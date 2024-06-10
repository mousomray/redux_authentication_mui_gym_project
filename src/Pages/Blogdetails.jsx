import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
// Import Api function area
import { blogdetail } from '../Allreducers/blogdetailslice';
import { Link, useParams } from 'react-router-dom';
import Loader1 from '../Common/Loader1';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



const Blogdetails = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id } = useParams()
    const dispatch = useDispatch();

    const { blogdetaildata, loading } = useSelector((state) => state.myblogdetail);

    console.log("detailssssssss", blogdetaildata);

    useEffect(() => {
        dispatch(blogdetail(id));
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

                <div className='container-fluid' style={{ marginTop: '70px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>

                                {/*Card Area Start*/}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Card sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 2px 0px 2px #E31C25', backgroundColor: 'black' }}>
                                        <CardMedia
                                            component="img"
                                            height="400"
                                            image={`${process.env.REACT_APP_BASE_URL}${blogdetaildata.image}`}
                                            alt="Paella dish"
                                        />
                                        <CardContent style={{ color: 'red' }}>
                                            <Typography gutterBottom variant="h3" component="div" sx={{ color: 'red' }}>
                                                {blogdetaildata?.title}
                                            </Typography>
                                        </CardContent>

                                        <CardContent>
                                            <Typography paragraph sx={{ color: 'yellow' }}>
                                                {blogdetaildata?.subtitle}
                                            </Typography>

                                        </CardContent>

                                        <CardContent>
                                            <Typography paragraph sx={{ color: 'white' }}>
                                                {blogdetaildata?.content}
                                            </Typography>

                                        </CardContent>
                                        <CardContent>
                                            <Link to='/blog'><button type="button" class="btn btn-danger">Back</button></Link>
                                        </CardContent>

                                    </Card>
                                </div>
                                {/*Card Area End*/}

                            </Grid>

                        </Grid>
                    </Box>
                </div>

            </Layout>
        </>
    )
}

export default Blogdetails
