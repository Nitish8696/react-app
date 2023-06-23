import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../FirebaseConfigs/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import './css/Signup.scss'

import { Link } from 'react-router-dom'

const Signup = () => {
    const [userName, setUserName] = useState('')
    const [phoneNuber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentail) => {
                const user = userCredentail.user;
                console.log(user);


                addDoc(collection(db, 'users'), {
                    userName: userName, email: email, phoneNumber: phoneNuber, address: address,
                    password: password, uid: user.uid
                }).then(() => {
                    setSuccessMsg('New user added succesfully you will now automatically redirected to login page')
                    setUserName('')
                    setPhoneNumber('')
                    setEmail('')
                    setPassword('')
                    setAddress('')
                    setTimeout(() => {
                        setSuccessMsg('')
                        navigate('/login')
                    }, 3000);
                }).catch((error) => setErrorMsg(error.message))

            }).catch((error) => {
                if (error.message == 'Firebase: Error (auth/invalid-email).') {
                    setErrorMsg('Please fill all required feilds')
                }
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    setErrorMsg('User Already Exist')
                }
            })
    }

    return (
        <div className='signup-container'>
            <form className="signup-form rounded-md w-[350px] border border-gray-300 p-5 shadow-md" onSubmit={handleSubmit}>
                <p className='text-2xl font-medium'>Create Account</p>
                {successMsg && (
                    <div className='success-msg'>{successMsg}</div>
                )}
                {errorMsg && (
                    <div className='error-msg'>{errorMsg}</div>
                )}
                <div className='flex flex-col'>
                    <label className='font-medium text-sm'>Your Name:</label>
                    <input className='outline-none border border-gray-600 rounded-md p-1' type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Enter Your Name' />
                </div>

                <div className='flex flex-col'>
                    <label  className='font-medium text-sm'>Mobile Number:</label>
                    <div className='w-full flex gap-2'>
                        <span className='border-gray-300 shadow-md border rounded-md p-2 w-[25%] text-sm'>IN +91</span>
                        <input className='outline-none border w-[75%] border-gray-600 rounded-md p-1' type="tel" onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Mobile Number' />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label className='font-medium text-sm'>Email:</label>
                    <input className='outline-none border border-gray-600 rounded-md p-1' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' />
                </div>

                <div className='flex flex-col'>
                <label  className='font-medium text-sm'>Password:</label>
                <input className='outline-none border border-gray-600 rounded-md p-1' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </div>

                <textarea className='outline-none border border-gray-600 rounded-md p-2' placeholder='Enter Your Address' onChange={(e) => setAddress(e.target.value)}></textarea>

                <button type='submit' className='submit font-medium bg-yellow-300 p-1 rounded-md hover:bg-yellow-400' >Sign Up</button>
                <div>
                    <span className='text-sm'>Already have an account ?</span>
                    <Link to='/login' className='sign-in text-blue-800 text-sm'>Sign In</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
