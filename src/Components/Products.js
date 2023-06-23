import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { storage, auth, db } from '../FirebaseConfigs/FirebaseConfig'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCategory } from '../features/fetchSlice'

const Products = () => {
  const [product, setProduct] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const getProducts = () => {
      const path = "products-ALL"
      const productsArray = []
      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id })
        })
        setProduct(productsArray)
      })
    }
    getProducts()
  }, [])
  const all = () =>{
    dispatch(getCategory('all'))
  }
  return (
    <div className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-10 px-4 py-4'>
      {product?.map((item) => {
        return <div className='bg-white h-auto py-6 z-30
        hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4'>
          <div className='w-full h-auto flex items-center justify-center'>
            <img className='w-44 md:w-40 h-64 object-contain' src={item.image} alt="" />
          </div>
          <div className='px-4'>
            <div className='flex flex-col items-start justify-between'>
              <h2 className='tracking-wide text-lg text-[#37475A] font-medium'>{item.title.substring(0, 20)}</h2>
              <p className='text-sm text-gray-600'>Price : ₹ {item.price}</p>
            </div>
            <Link to={`/product/${item.id}`}><button className='w-full bg-gradient-to-tr from-yellow-400 to-yellow-200
            border  hover:border-yellow-500 text-sm
            ' onClick={all}>View More</button></Link>
          </div>
        </div>
      })}
    </div>
  )
}
export default Products
