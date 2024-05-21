import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for blogdetail 
export const blogdetail = createAsyncThunk("blogdetail", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `getblogdetails/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching blogdetail data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching blogdetail data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const blogdetaildetails = createSlice({
    name: "blogdetaildetails",
    initialState: {
        blogdetaildata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            .addCase(blogdetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(blogdetail.fulfilled, (state, action) => {
                state.loading = false;
                state.blogdetaildata = action.payload;
            })
            .addCase(blogdetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default blogdetaildetails.reducer;