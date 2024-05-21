import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Auth/authslice" // In this case we use { } because we not do export default only do export
import bannerdetails from "../Allreducers/bannerslice"
import trainerdetails from "../Allreducers/trainerslice"
import testimonialdetails from "../Allreducers/testimonialslice"
import servicedetails from "../Allreducers/serviceslice"
import servicedetaildetails from "../Allreducers/servicedetailslice"
import blogdetails from "../Allreducers/blogslice"
import blogdetaildetails from "../Allreducers/blogdetailslice"
import bookingdetails from "../Allreducers/bookingslice"


export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer, // Reducer for Auth 
        mybanner: bannerdetails, // Reduce for Banner
        mytrainer: trainerdetails, // Reduce for Trainer
        mytestimonial: testimonialdetails, // Reduce for Testimonial
        myservice: servicedetails, // Reduce for Service
        myservicedetail: servicedetaildetails, // Reduce for Servicedetail
        myblog: blogdetails, // Reduce for Blog
        myblogdetail: blogdetaildetails, // Reduce for Servicedetails
        mybooking: bookingdetails
    },
});