import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for Banner Slider
export const banner = createAsyncThunk("banner", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'getbanner'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Banner data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Banner data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const bannerdetails = createSlice({
    name: "bannerdetails",
    initialState: {
        bannerdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(banner.pending, (state) => {
                state.loading = true;
            })
            .addCase(banner.fulfilled, (state, action) => {
                state.loading = false;
                state.bannerdata = action.payload;
            })
            .addCase(banner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default bannerdetails.reducer;