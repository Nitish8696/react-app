import React from 'react'
import { useSelector } from 'react-redux'
import './css/Checkout.scss'

const Checkout = () => {
    const { cart } = useSelector((store) => store.cart)
    const { user } = useSelector((store) => store.user)

    const total = cart.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.price);
    }, 0)
    return (
        <>
            <section className='checkout'>
                <div className='details'>
                    <div className='add'>
                        <span className='text-2xl font-semibold'>
                            Dilevery Address
                        </span>
                        <span>
                            {user.address}
                        </span>
                        <button className='hover:text-red-600 hover:underline decoration-red-600 text-blue-700'>
                            change
                        </button>
                    </div>
                    <hr className='my-2'/>
                    <div className='my-6 text-2xl font-semibold'>
                        <span>
                            Select Payment Method
                        </span>
                    </div>
                </div>
                <div className='summry'>
                    <div>
                        <p className='text-2xl order'>
                            Order Summary
                        </p>
                        <p>Items : Rs {total}</p>
                        <p>Delivery : Rs 150</p>
                        <hr />
                        <p className='text-xl font-semibold my-2'>Order Total : Rs {total + parseInt(150)}</p>
                        <hr />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout
