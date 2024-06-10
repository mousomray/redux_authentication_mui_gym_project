import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for booking Slider
export const showbooking = createAsyncThunk("showbooking", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `viewBooking/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching booking data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching booking data", error);
        return rejectWithValue(error.response.data);
    }
});


// createSlice area start
const showbookingslice = createSlice({
    name: "showbooking",
    initialState: {
        showbookingdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(showbooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(showbooking.fulfilled, (state, action) => {
                state.loading = false;
                state.showbookingdata = action.payload;
            })
            .addCase(showbooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default showbookingslice.reducer;