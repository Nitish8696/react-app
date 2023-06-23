import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../FirebaseConfigs/FirebaseConfig'
import { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
          setSuccessMsg('New user added succesfully you will now automatically redirected to login page')
          setEmail('')
          setPassword('')
          setTimeout(() => {
            setSuccessMsg('')
            navigate('/home')
          }, 3000);
        }).catch((error)=>{
          console.log(error);
          const errorCode = error.code;
          if (error.message == 'Firebase: Error (auth/invalid-email).') {
            setErrorMsg('please fill all required feilds')
          }
          if (error.message == 'Firebase: Error (auth/user-not-found).') {
            setErrorMsg('Email not found')
          }
          if (error.message == 'Firebase: Error (auth/wrong-password).') {
            setErrorMsg('Wroung Password')
          }
        })
      }

  return (
      <div className='signup-container'>
        <form className="signup-form w-[350px] border border-gray-300 p-5 shadow-md rounded-md" >
          <p className='text-2xl font-medium'>Login</p>
          {successMsg && (
            <div className='success-msg'>{successMsg}</div>
          )}
          {errorMsg && (
            <div className='error-msg'>{errorMsg}</div>
          )}
          <div className='flex flex-col'>
          <label className='font-semibold text-sm'>Email:</label>
          <input className='outline-none border border-gray-600 rounded-md p-1' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' />
          </div>

          <div className='flex flex-col'>
          <label className='font-semibold text-sm'>Password:</label>
          <input className='outline-none border border-gray-600 rounded-md p-1' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          </div>

          <button type='submit' className='submit font-medium bg-yellow-300 p-1 rounded-md hover:bg-yellow-400' onClick={handleLogin}>Login</button>
          <div>
            <span className='text-sm'>Not have an account ?</span>
            <Link to='/signup' className='sign-in  text-blue-800 text-sm'>Register</Link>
          </div>
        </form>
      </div>
    )
  }

  export default Login
