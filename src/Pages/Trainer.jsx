import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { trainer } from '../Allreducers/trainerslice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Trainer = () => {
  const dispatch = useDispatch();
  const { trainerdata, loading } = useSelector((state) => state.mytrainer);

  useEffect(() => {
    dispatch(trainer());
  }, []);

  return (
    <>
      <div className='container mt-5'>
        <h1 className='mb-5' style={{ textAlign: 'center' }}>Our Trainers</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            {trainerdata.map((value) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
                <Card sx={{
                  maxWidth: 345,
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
                      height="350"
                      image={`${process.env.REACT_APP_BASE_URL}${value.image}`}
                      alt="trainer"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {value?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <b>Speciality : </b>{value?.speciality} <br />
                        <b>Experience : </b>{value?.experience}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Trainer;
