import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products : [],
    filtered_products : [],
    sort : 'price-lowest',
    query : '',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateProduct : (state,action) =>{
            let products = action.payload
            state.products = products
            console.log(state.products);
            state.filtered_products = products
        },
        updateSort: (state, action) => {
            state.sort = action.payload
            let tempProduct = [...state.products]
            if (state.sort === "price-lowest") {
                tempProduct = tempProduct.sort((a,b)=>a.price-b.price)
            }
            if (state.sort === "price-highest") {
                tempProduct = tempProduct.sort((a,b)=>b.price-a.price)
            }
            if (state.sort === "name-a") {
                tempProduct = tempProduct.sort((a,b)=>{
                    return a.title.localeCompare(b.title)
                })
            }
            if (state.sort === "name-z") {
                tempProduct = tempProduct.sort((a,b)=>{
                    return b.title.localeCompare(a.title)
                })
            }
            state.filtered_products = tempProduct
        },
        updateQuery : (state,action) =>{
            state.query = action.payload
            let tempProduct = [...state.products]
            if (state.query) {
                tempProduct = tempProduct.filter((product)=>{
                   return product.title.toUpperCase().startsWith(state.query.toUpperCase())
                })
                state.filtered_products = tempProduct
            }
            else {
                state.filtered_products = state.products
            }
        }
    }
})

export const {updateSort,updateProduct,updateQuery} = filterSlice.actions

export default filterSlice.reducer