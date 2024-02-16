import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getWeather = createAsyncThunk("auth/weather", async ({ latitude, longitude }) => {
    try {
        const { data } = await axiosClient.get('/auth/weather', {
            params: {
                lat: latitude,
                lon: longitude,
            },
        });
        return data;
    } catch (error) {
        return console.log({ error })
    }
})
const featureSlicer = createSlice({
    name: 'featureSlicer',
    initialState: {
        weather: {},

    },
    extraReducers: (builder) => {
        builder.addCase(getWeather.fulfilled, (state, action) => {
            state.weather = action.payload;
        })
    }
})

export default featureSlicer.reducer