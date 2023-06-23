import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    category: 'ALL',
    fetchSingleProduct: ''
}

const fetchSlice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {
        getCategory: (state, action) => {
            state.category = action.payload
        }
    }
})

export const { getCategory } = fetchSlice.actions

export default fetchSlice.reducer