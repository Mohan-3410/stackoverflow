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
        return console.log({ error })
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

export const fetchAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
    const { data } = await axiosClient.get('/auth/getAllUsers');
    return data;
})

export const updateUser = createAsyncThunk("auth/update/:id", async ({ id, name, about, tags }, thunkAPI) => {
    try {
        const { data } = await axiosClient.patch(`/auth/update/${id}`, { name, about, tags });
        thunkAPI.dispatch(updateCurrentUser(data))
        return data;
    } catch (e) {
        console.error("Error: " + e.message);
    }
})

const authSlicer = createSlice({
    name: 'authSlicer',
    initialState: {
        auth: null,
        currentUser: null,
        users: []
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = { ...state.currentUser, result: action.payload }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.auth = action.payload;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.auth = action.payload;
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.users = state.users.map(user => user._id === action.payload._id ? action.payload : state.users)
        })
    }
})

export const { setCurrentUser, updateCurrentUser } = authSlicer.actions;
export default authSlicer.reducer;
