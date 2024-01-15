import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient";


export const login = createAsyncThunk("auth/login", async ({ email, password, navigate }, thunkAPI) => {
    try {
        const response = await axiosClient.post('/auth/login', { email, password });
        localStorage.setItem('Profile', JSON.stringify({ ...response.data }));
        thunkAPI.dispatch(setCurrentUser(response.data))
        navigate("/")
        return response.data;
    } catch (error) {
        return console.log({ error: error.message })
    }
})

export const signup = createAsyncThunk("auth/signup", async ({ name, email, password, navigate }, thunkAPI) => {
    try {
        const response = await axiosClient.post('/auth/signup', { name, email, password });
        localStorage.setItem('Profile', JSON.stringify({ ...response.data }));
        thunkAPI.dispatch(setCurrentUser(response.data))
        navigate("/")
        return response.data;
    } catch (error) {
        return console.log({ error: error.message })
    }
})

const authSlicer = createSlice({
    name: 'authSlicer',
    initialState: {
        auth: null,
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.auth = action.payload;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.auth = action.payload;
        })
    }
})

export const { setCurrentUser } = authSlicer.actions;
export default authSlicer.reducer;
