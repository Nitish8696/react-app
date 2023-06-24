import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, query, onSnapshot, getDocs, QuerySnapshot } from 'firebase/firestore'
import { db } from '../FirebaseConfigs/FirebaseConfig'
import Productcontainer from './comp/Productcontainer'
import { getCategory } from '../features/fetchSlice'
import './css/Category.scss'
import { useDispatch, useSelector } from 'react-redux'
import { updateSort,updateProduct } from '../features/filterSlice'

const Category = () => {
    const { id } = useParams()
    const {filtered_products} = useSelector((store)=> store.filter)
    const [select, setSelect] = useState('price-lowest')
    const dispatch = useDispatch()

    useEffect(() => {
        const getProducts = () => {
            const path = `products-${id.toUpperCase()}`
            const productsArray = []
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id })
                })
                dispatch(updateProduct([...productsArray]))
                dispatch(updateSort(select))
            })
        }
        dispatch(getCategory(id))
        getProducts()
    }, [id])

    useEffect(()=>{
        dispatch(updateSort(select))
    },[select])

    return (
        <div className='category'>
            <div className='cat-details flex justify-between items-center my-10'>
                <div className='cat-head flex flex-col pl-20'>
                    <p>Home/Category/{<span className='font-semibold'>{id}</span>}</p>
                    <p><span className='font-semibold'>{id}</span>- {filtered_products.length} items</p>
                </div>
                <form className='pr-20 cat-fil'>
                    <select className=' select p-2 outline-none '
                        value={select}
                        onChange={(e)=>setSelect(e.target.value)}
                    >
                        <option selected value='price-lowest'>Price (Lowest)</option>
                        <option value='price-highest'>Price (Higest)</option>
                        <option value='name-a'>Name (A-Z)</option>
                        <option value='name-z'>Name (Z-A)</option>
                    </select>
                </form>
            </div>
            <hr />
            <div className='products max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 px-2'>
                {filtered_products?.map((product) => {
                    return <Productcontainer key={product.id} product={product} />
                })}
            </div>
        </div>
    )
}

export default Category
