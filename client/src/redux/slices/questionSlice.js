import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient";

export const voteQuestion = createAsyncThunk("questions/vote/:id", async ({ id, value, userId }, thunkAPI) => {
    await axiosClient.patch(`/questions/vote/${id}`, { value, userId });
    thunkAPI.dispatch(fetchAllQuestion());
})

export const deleteAnswer = createAsyncThunk("answer/delete/:id", async ({ id, answerId, noOfAnswers }, thunkAPI) => {
    try {
        await axiosClient.patch(`/answer/delete/${id}`, { answerId, noOfAnswers })
        thunkAPI.dispatch(fetchAllQuestion());
    } catch (e) {
        console.log({ error: e.message })
    }
})

export const deleteQuestion = createAsyncThunk("questions/delete/:id", async ({ id, navigate }, thunkAPI) => {
    try {
        await axiosClient.delete(`/questions/delete/${id}`)
        thunkAPI.dispatch(fetchAllQuestion())
        navigate('/')
    } catch (e) {
        console.log({ error: e.message })
    }
})
export const postAnswer = createAsyncThunk("answer/post/:id", async ({ id, noOfAnswers, answerBody, userAnswered, userId }, thunkAPI) => {
    try {
        const response = await axiosClient.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
        thunkAPI.dispatch(fetchAllQuestion())
        return response.data;
    } catch (e) {
        console.log({ error: e.message })
    }
})


export const askQuestion = createAsyncThunk("questions/Ask", async ({ questionTitle, questionBody, questionTags, userPosted, userId, navigate }, thunkAPI) => {
    try {
        const response = await axiosClient.post('/questions/Ask', { questionTitle, questionBody, questionTags, userPosted, userId });
        thunkAPI.dispatch(fetchAllQuestion())
        navigate('/')
        return response.data;
    } catch (e) {
        return console.log({ error: e.message })
    }
})

export const fetchAllQuestion = createAsyncThunk("questions/get", async () => {
    try {
        const response = await axiosClient.get('/questions/get');
        return response.data;
    } catch (e) {
        return console.log({ error: e.message })
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
