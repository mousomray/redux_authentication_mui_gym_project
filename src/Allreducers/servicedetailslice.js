import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for servicedetail 
export const servicedetail = createAsyncThunk("servicedetail", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `getservicedetails/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching servicedetail data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching servicedetail data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const servicedetaildetails = createSlice({
    name: "servicedetaildetails",
    initialState: {
        servicedetaildata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            .addCase(servicedetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(servicedetail.fulfilled, (state, action) => {
                state.loading = false;
                state.servicedetaildata = action.payload;
            })
            .addCase(servicedetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default servicedetaildetails.reducer;