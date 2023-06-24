import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { getCart, getWish } from '../features/cartSlice'
import { collection, query, doc, onSnapshot, getDoc, QuerySnapshot, where, addDoc } from 'firebase/firestore'
import { db } from '../FirebaseConfigs/FirebaseConfig'
import { useDispatch } from 'react-redux'
import { FaPlus, FaMinus } from 'react-icons/fa'
import Spinner from './Spinner'

const Singleproduct = () => {
    let overalltax = 10 / 100;
    let overcommission = 10 / 100;
    let extraforfun = 10 / 100;

    const { id } = useParams()
    const { wishList } = useSelector((store) => store.cart)
    const dispatch = useDispatch()
    const [product,setProducts] = useState({})
    const [loading,setLoading] = useState(false)
    const { category } = useSelector((store) => store.fetch)
    console.log(category);

    const getProducts = async (id) => {
        setLoading(true)
        const docRef = doc(db, `products-${category.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProducts({ ...docSnap.data(), id: docSnap.id });
        setLoading(false)
    }
    useEffect(() => {
        getProducts(id)
    }, [id])

    const [quantity, setQuantity] = useState(1)


    let mrp = Math.floor(parseInt(product?.price));
    mrp = Math.floor(mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp)
    const saleprice = Math.floor(mrp - extraforfun * mrp)

    const addtocart = () => {
        dispatch(getCart({ ...product, quantity }))
    }

    const addtoWishList = () => {
        dispatch(getWish({ ...product, isWishlistAdded: true }))
    }

    const decrease = () =>{
        if (quantity <= 1) {
            return
        }
        else{
            return setQuantity(quantity-1)
        }
    }
    const increase = () =>{
            return setQuantity(quantity+1)
    }

    const isItemInWishlist = wishList.some((item) => item.id === id)


    if (loading) {
        return <Spinner/>
    }
    else {
        return (
            <>
                {product && <div className='flex flex-col items-center justify-center sm:flex-row'>
                    <div className='w-full flex items-center justify-center mt-10 mb-10'>
                        <img src={product.image} className='w-[250px] h-auto' alt="" />
                    </div>
                    <div className='p-2 flex flex-col gap-5 w-full'>
                        <div>
                            <p className="text-lg font-medium">{product.title}</p>
                        </div>
                        <div>
                            <p className='font-medium'>MRP Rs: <span>{mrp}</span></p>
                            <p className='font-medium'>Discount Price Rs: <span>{saleprice}</span></p>
                            <p className='font-medium'>You Save Rs: <span>{mrp - saleprice}</span></p>
                        </div>
                        <p className="text-sm">{product.description}</p>
                        <div className="flex flex-col gap-2 justify-center">
                            <div className="flex gap-2 pl-3">
                                <button onClick={decrease}><FaMinus/></button>
                                <span className='font-semibold text-lg'>{quantity}</span>
                                <button onClick={increase}><FaPlus/></button>
                            </div>
                            <button className={isItemInWishlist ? `w-full sm:w-[50%] px-3 py-3 rounded-full flex items-center justify-center bg-black`
                                : `w-full px-3 py-3 rounded-full flex items-center border-solid border border-gray-500 hover:border-black justify-center`} onClick={addtoWishList}>
                                {isItemInWishlist ? <p className='text-white'>WishListed</p> : <p>Wishlist</p>}
                                {isItemInWishlist ? <AiFillHeart className='heart-icon text-xl mx-1 text-red-700' /> : <AiOutlineHeart className='text-black text-xl mx-1' />}
                            </button>
                            <div className="w-full buy-cart flex flex-col gap-1">
                                <Link to='/cart'><button className="w-full sm:w-[50%] text-white bg-black hover:bg-gray-500 md-shadow px-3 py-3 rounded-full" onClick={addtocart}>Add To Cart</button></Link>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
        )
    }
}

export default Singleproduct
