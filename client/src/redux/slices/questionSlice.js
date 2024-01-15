import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient";


export const postAnswer = createAsyncThunk("answer/post/:id", async ({ id, noOfAnswers, answerBody, userAnswered }, thunkAPI) => {
    try {
        const response = await axiosClient.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
        thunkAPI.dispatch(fetchAllQuestion())
        return response.data;
    } catch (e) {
        console.log({ error: error.message })
    }
})


export const askQuestion = createAsyncThunk("questions/Ask", async ({ questionTitle, questionBody, questionTags, userPosted, navigate }, thunkAPI) => {
    try {
        const response = await axiosClient.post('/questions/Ask', { questionTitle, questionBody, questionTags, userPosted });
        thunkAPI.dispatch(fetchAllQuestion())
        navigate('/')
        return response.data;
    } catch (error) {
        return console.log({ error: error.message })
    }
})

export const fetchAllQuestion = createAsyncThunk("questions/get", async () => {
    try {
        const response = await axiosClient.get('/questions/get');
        return response.data;
    } catch (e) {
        return console.log({ error: error.message })
    }
})

const questionSlicer = createSlice({
    name: 'questionSlicer',
    initialState: {
        questionList: null,

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllQuestion.fulfilled, (state, action) => {
            state.questionList = action.payload;
        })
    }
})


export default questionSlicer.reducer;
