import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux';

// Import Api function area
import { booking } from '../Allreducers/bookingslice';
import { useParams } from 'react-router-dom';

const Booking = () => {

    const { id } = useParams()
    const dispatch = useDispatch();

    const { bookingdata, loading } = useSelector((state) => state.mybooking);

    console.log("bookingssssssss", bookingdata);

    useEffect(() => {
        dispatch(booking(id));
    }, []);

    return (
        <>
            <Layout>
              
            </Layout>
        </>
    )
}

export default Booking
