import React from 'react'
import { useSelector } from 'react-redux'
import { CiCircleRemove } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import './Wishlist.scss'
import {removeItemFromWish} from '../../features/cartSlice'
import { useDispatch } from 'react-redux'

const Wishlist = () => {
    const { wishList } = useSelector((store) => store.cart)

    const dispatch = useDispatch()

    const handleClick = (id) =>{
        dispatch(removeItemFromWish(id))
    }

    return <>
        <div className='bg-white w-full h-full'>
        <div className='wishlist-container '>
        <h4 className='mb-8 pt-8'><span className='font-semibold'>My Wishlist {wishList.length}</span> items</h4>
        <div className='wishlist max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 px-2 py-4'>
            {wishList?.map((item) => {
                return <div className='wish-pro-details border-[1px] border-gray-400 bg-white h-auto py-6 z-30
                 shadow-none hover:shadow-md hover:border-gray-200 duration-200 relative flex justify-center items-center flex-col gap-4' key={item.id}>
                    <CiCircleRemove className='wish-remove absolute top-2 right-2 text-lg cursor-pointer' onClick={() => handleClick(item.id)}/>
                    <img src={item.image} className='w-48 md:w-48 h-64 object-contain' alt="" />
                    <p>{item.productTitle}</p>
                    <p className='font-medium'>Rs.{item.price}</p>
                    <div className='wish-pro-btn'><Link to={`/product/${item.id}`} className='text-xs font-semibold text-red-500'>ADD TO BAG</Link></div>
                </div>
            })}
        </div>
        </div>
        </div>
    </>
}

export default Wishlist
