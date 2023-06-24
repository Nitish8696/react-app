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
    <div className='max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 px-4 bg-gray-50 py-4 mt-[-40px] sm:mt-[-100px]'>
      {product?.map((item) => {
        return <div className='bg-white h-auto py-6 z-30
        hover:border-transparent shadow-none hover:shadow-lg border border-gray-200 duration-200 relative flex flex-col gap-4 p-1'>
          <div className='w-full h-auto flex items-center justify-center'>
            <img className='w-50 md:w-40 h-60 object-contain' src={item.image} alt="" />
          </div>
          <div className='sm:px-4'>
            <div className='flex flex-col items-center justify-between'>
              <h2 className='tracking-wide text-md text-[#37475A] text-center font-medium'>{item.title.substring(0, 25)}</h2>
              <p className='text-sm text-gray-600'>Price : ₹ {item.price}</p>
            </div>
            <Link to={`/product/${item.id}`}><button className='w-full p-1 bg-black hover:bg-black/75 text-white rounded-md text-sm
            ' onClick={all}>View More</button></Link>
          </div>
        </div>
      })}
    </div>
  )
}
export default Products
