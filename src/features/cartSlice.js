import { createSlice } from "@reduxjs/toolkit";


const getCartFromLocal = () => {
    let cart = localStorage.getItem('cartSystem')
    if (cart) {
        return JSON.parse(localStorage.getItem('cartSystem'))
    }
    else {
        return []
    }
}
const getWishFromLocal = () => {
    let cart = localStorage.getItem('wishSystem')
    if (cart) {
        return JSON.parse(localStorage.getItem('wishSystem'))
    }
    else {
        return []
    }
}

const initialState = {
    cart: getCartFromLocal(),
    wishList: getWishFromLocal(),
    totalAmount: 0,
    totalItems: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            let items = action.payload
            let cartValues = state.cart.find((item) => item.id == items.id)
            if (cartValues) {
                const tempCart = state.cart.map((item) => {
                    if (item.id == cartValues.id) {
                        console.log(item.quantity);
                        let Quantity = parseInt(item.quantity) + items.quantity
                        return { ...item, quantity: Quantity }
                    }
                    else {
                        return item
                    }
                })
                state.cart = tempCart
            }
            else {
                state.cart = [...state.cart, items]
            }
            console.log(state.cart);
            localStorage.setItem('cartSystem', JSON.stringify(state.cart))
        },
        getWish: (state, action) => {
            let items = action.payload;
            console.log(items);
            let wishValues = state.wishList.find((item) => item.id === items.id)
            if (wishValues) {
                let wishTemp = state.wishList.map((item) => {
                    if (item.id === wishValues.id) {
                        return item
                    }
                })
                state.wishList = wishTemp
            }
            else{
                state.wishList = [...state.wishList,items]
            }
            localStorage.setItem('wishSystem',JSON.stringify(state.wishList))
        },
        removeItemFromWish : (state,action) =>{
           const id = action.payload;
           const wishValues = state.wishList.filter((item)=> item.id !== id)
           state.wishList = wishValues
           localStorage.setItem('wishSystem',JSON.stringify(state.wishList))
        },
        removeItemFromCart : (state,action) =>{
            const id = action.payload;
            const cartValues = state.cart.filter((item)=> item.id !== id)
            state.cart = cartValues
            localStorage.setItem('cartSystem',JSON.stringify(state.cart))
        }
    }
})

export const { getCart, getWish, removeItemFromWish,removeItemFromCart ,clearCart} = cartSlice.actions

export default cartSlice.reducer