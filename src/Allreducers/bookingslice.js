import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for booking Slider
export const booking = createAsyncThunk("booking", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'booking'
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching booking data", response);
        toast.succes(response?.data?.message)
        return response?.data
    } catch (error) {
        console.log("Error Fetching booking data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const bookingdetails = createSlice({
    name: "booking",
    initialState: {
        bookingdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(booking.pending, (state) => {
                state.loading = true;
            })
            .addCase(booking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingdata = action.payload;
            })
            .addCase(booking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default bookingdetails.reducer;