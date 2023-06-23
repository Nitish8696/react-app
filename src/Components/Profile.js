import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user } = useSelector((store) => store.user)
  return (
    <>
      {user ? <div className='flex flex-col items-start justify-center border rounded-md border-gray-200 sm:w-[600px] w-[350px] gap-3 mx-auto p-5 my-10'>
        <p className='w-full font-medium'>Account Details</p>
        <div className='flex justify-between items-center w-full'>
          <div>
            <label className='font-semibold text-sm'>Name:</label>
            <p className='text-sm'>{user.userName}</p>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div>
            <label className='font-semibold text-sm'>Mobile:</label>
            <p className='text-sm'>{user.phoneNumber}</p>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div>
            <label className='font-semibold text-sm'>Email:</label>
            <p className='text-sm'>{user.email}</p>
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div>
            <label className='font-semibold text-sm'>Address:</label>
            <p className='text-sm'>{user.address}</p>
          </div>
        </div>
      </div> : <div>
        Please Login First
        <Link to={'/login'}><button>Login</button></Link>
      </div>}
    </>
  )
}

export default Profile
