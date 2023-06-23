import React from 'react'
import { useState,useEffect } from 'react'
import Products from './Products'
import Banner from './comp/Banner'
import {auth,db} from '../FirebaseConfigs/FirebaseConfig'
import {collection,getDocs,query,where} from 'firebase/firestore'
import {onAuthStateChanged} from 'firebase/auth'
import Navbar from './Navbar'
import { updateUser } from '../features/userSlice'
import { useDispatch } from 'react-redux'


const Home = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth,(userLogged)=>{
      if (userLogged) {
        const getUser = async() =>{
          const q = query(collection(db,'users'), where('uid', '==',userLogged.uid))
          const data = await getDocs(q)
          dispatch(updateUser((data.docs.map((doc)=> ({...doc.data(),id:doc.id}))[0])))
        }
        getUser()
      }
      else{
        dispatch(updateUser(null))
      }
    })
  },[])

  return (
    <div>
      <Banner/>
      <Products/>
    </div>
  )
}

export default Home
