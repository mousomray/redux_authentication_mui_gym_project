import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for blog Slider
export const blog = createAsyncThunk("blog", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'getblog'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching blog data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching blog data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const blogdetails = createSlice({
    name: "blogdetails",
    initialState: {
        blogdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(blog.pending, (state) => {
                state.loading = true;
            })
            .addCase(blog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogdata = action.payload;
            })
            .addCase(blog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default blogdetails.reducer;