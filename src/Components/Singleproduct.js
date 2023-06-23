import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { getCart, getWish } from '../features/cartSlice'
import { collection, query, doc, onSnapshot, getDoc, QuerySnapshot, where, addDoc } from 'firebase/firestore'
import { db } from '../FirebaseConfigs/FirebaseConfig'
import { useDispatch } from 'react-redux'
import './css/Singleproduct.scss'
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
    mrp = mrp + overalltax * mrp + overcommission * mrp + extraforfun * mrp
    const saleprice = Math.floor(mrp - extraforfun * mrp)

    const addtoWishList = () => {
        dispatch(getWish({ ...product, isWishlistAdded: true }))
    }


    const addtocart = () => {
        dispatch(getCart({ ...product, quantity }))
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
                {product && <div className='single'>
                    <div className='single-product-img-con'>
                        <img src={product.image} className='sin-pro-img shadow-md' alt="" />
                    </div>
                    <div className='single-product-details-con flex flex-col gap-5'>
                        <div className="sin-pro-data">
                            <p className="sin-pro-head text-xl font-medium">{product.title}</p>
                        </div>
                        <div className="sin-pro-price">
                            <p className='sin-pro-mrp font-medium'>MRP Rs: <span>{mrp}</span></p>
                            <p className='sin-pro-saleprice font-medium'>Discount Price Rs: <span>{saleprice}</span></p>
                            <p className='sin-pro-yousave font-medium'>You Save Rs: <span>{mrp - saleprice}</span></p>
                        </div>
                        <p className="sin-pro-des">{product.description}</p>
                        <div className="row-cont flex flex-col gap-2">
                            <div className="warranty-replacement">
                                <button onClick={decrease}><FaMinus/></button>
                                <span>{quantity}</span>
                                <button onClick={increase}><FaPlus/></button>
                            </div>
                            <button className={isItemInWishlist ? `wish w-1/3 px-3 py-2 rounded-full flex items-center justify-center bg-black`
                                : `wish w-1/3 px-3 py-2 rounded-full flex items-center border-solid border border-gray-500 hover:border-black justify-center`} onClick={addtoWishList}>
                                {isItemInWishlist ? <p className='text-white'>WishListed</p> : <p>Wishlist</p>}
                                {isItemInWishlist ? <AiFillHeart className='heart-icon text-xl mx-1' /> : <AiOutlineHeart className='text-black text-xl mx-1' />}
                            </button>
                            <div className=" wish w-1/3 buy-cart flex flex-col gap-1">
                                <Link to='/cart'><button className="btn w-full text-white bg-black hover:bg-gray-500 md-shadow px-3 py-2 rounded-full" onClick={addtocart}>Add To Cart</button></Link>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
        )
    }
}

export default Singleproduct
