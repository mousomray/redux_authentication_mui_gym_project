import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for booking Slider
export const booking = createAsyncThunk("booking", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `viewBooking/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching booking data", response);
        return response?.data?.result
    } catch (error) {
        console.log("Error Fetching booking data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const bookingdetails = createSlice({
    name: "bookingdetails",
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