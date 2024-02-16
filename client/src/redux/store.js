import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import questionReducer from "./slices/questionSlice"
import featureReducer from "./slices/featureSlice"

export default configureStore({
    reducer: {
        authReducer,
        questionReducer,
        featureReducer
    }
})