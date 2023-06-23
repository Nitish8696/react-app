import React from 'react'
import { Link } from 'react-router-dom';
import './Productcontainer.scss'

const Productcontainer = ({ product }) => {

          return <div className='z-30 relative flex flex-col gap-4'>
              <div className='w-full h-auto flex items-center justify-center'>
                <Link to={`/product/${product.id}`}>
                <img className='w-52 md:w-52 object-contain' src={product.image} alt="" />
                </Link>
              </div>
              <div className='px-4'>
                <div className='flex flex-col items-start'>
                <Link to={`/product/${product.id}`}>
                  <h2 className='tracking-wide text-lg text-[#37475A] font-medium'>{product.title.substring(0, 20)}</h2>
                </Link>
                  <p className='text-sm text-gray-600'>Rs {product.price}</p>
                </div>
              </div>
            </div>
}

export default Productcontainer
