import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import logo from '../Components/assets/empty-bag.webp'
import { removeItemFromCart} from '../features/cartSlice'
import './css/Cart.scss'

const Cart = () => {
  const { cart } = useSelector((store) => store.cart)
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  console.log(cart);

  const total = cart.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.price*currentValue.quantity);
  }, 0)


  if (cart.length < 1) {
    return (
      <div className='flex flex-col items-center justify-center cart-empty'>
        <img src={logo} alt=""/>
        <h2 className='text-2xl'>Hey,it feels so light!</h2>
        <p className='my-1'>there is nothing in your bag lets add some items</p>
        <Link to={'/'} className='my-4'><button className='p-1 border-2 border-red-400 text-red-400'>ADD ITEMS</button></Link>
      </div>
    )
  }

  else {
    return <>
      <div className='cart-page'>
        <div className='cart-page-top'>
          <span className='cart-item'>Item</span>
          <span className='cart-span-price'>price</span>
          <span>quantity</span>
        </div>
        <hr />
        {cart?.map((car) => {
          return <>
            <div className='cart-page-details' key={car.id}>
              <div>
                <img src={car.image} className='cart-page-pro-img' alt="" />
                <h5>{car.title.substring(0,15)}</h5>
              </div>
              <h5 className='cart-price'>{car.price}</h5>
              <h5 className='cart-quantity'>{car.quantity}</h5>
              <MdDelete className='mddelete cursor-pointer' onClick={() => dispatch(removeItemFromCart(car.id))}/>
            </div>
          </>
        })}
        <hr />
        <div className='cart-page-btn'>
          <Link to={'/'} className='shop-btn hover:shadow-md transition duration-300 ease-in-out'>Continue shopping</Link>
        </div>
        <div className='my-4 total-container'>
          <div className='total-sub-con'>
            <p className='font-semibold'>Subtotal : Rs {total}</p>
            <p>Shipping Fee : Rs 150</p>
            <hr />
            <p className='text-xl font-semibold'>Order Total : Rs {total + parseInt(150)}</p>
            {user ? <Link to={'/checkout'} className='checkout-btn hover:shadow-md transition duration-300 ease-in-out text-center my-2'>Checkout</Link>
              : <Link to={'/login'} className='checkout-btn hover:shadow-md transition duration-300 ease-in-out text-center my-2'>Login</Link>}
          </div>
        </div>
      </div>
    </>
  }

}

export default Cart
