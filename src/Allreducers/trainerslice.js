import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for trainer Slider
export const trainer = createAsyncThunk("trainer", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'gettrainer'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching trainer data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching trainer data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const trainerdetails = createSlice({
    name: "trainerdetails",
    initialState: {
        trainerdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(trainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(trainer.fulfilled, (state, action) => {
                state.loading = false;
                state.trainerdata = action.payload;
            })
            .addCase(trainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default trainerdetails.reducer;