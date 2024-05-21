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

// Import Api function area
import { servicedetail } from '../Allreducers/servicedetailslice';
import { useParams } from 'react-router-dom';

const Servicedetails = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id } = useParams()
    const dispatch = useDispatch();

    const { servicedetaildata, loading } = useSelector((state) => state.myservicedetail);

    console.log("detailssssssss", servicedetaildata);

    useEffect(() => {
        dispatch(servicedetail(id));
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
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>

                                {/*Card Area Start*/}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Card sx={{ maxWidth: 500, justifyContent: 'center', alignItems: 'center', boxShadow: '0px 2px 0px 2px #E31C25' }}>
                                        <CardMedia
                                            component="img"
                                            height="400"
                                            image={`${process.env.REACT_APP_BASE_URL}${servicedetaildata.image}`}
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                <h1>{servicedetaildata?.service_name}</h1>
                                            </Typography>
                                        </CardContent>

                                        <CardContent>
                                            <Typography paragraph>
                                                {servicedetaildata?.service_description}
                                            </Typography>

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

export default Servicedetails
