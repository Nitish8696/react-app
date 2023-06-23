import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import fetchSlice from "./features/fetchSlice";
import cartSlice from './features/cartSlice'
import filterSlice from "./features/filterSlice";


export const store = configureStore({
    reducer : {
        user : userReducer,
        fetch : fetchSlice,
        cart : cartSlice,
        filter : filterSlice
    }
})