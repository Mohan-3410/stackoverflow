import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import questionReducer from "./slices/questionSlice"

export default configureStore({
    reducer: {
        authReducer,
        questionReducer
    }
})