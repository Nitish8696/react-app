import React, { useState, useEffect } from 'react'
import { storage, auth, db } from '../FirebaseConfigs/FirebaseConfig'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useSelector } from 'react-redux'
import './css/Addproduct.scss'

const Addproduct = () => {
    const { user } = useSelector((store) => store.user)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [imageError, setImageError] = useState([])
    const [uploadError, setUploadError] = useState('')


    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG', 'image/webp']

    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0]

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile)
                setImageError('')
            }
            else {
                setImage(null)
                setImageError('please select valid format (png or jpg)')
            }
        }
        else {
            setImageError('please select your file')
        }
    }

    const handleAddProduct = (e) => {
        e.preventDefault()
        const storageRef = ref(storage, `product-images${category.toUpperCase()}/${Date.now()}`)
        uploadBytes(storageRef, image)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products-${category.toUpperCase()}`), {
                        title,
                        description,
                        price,
                        category,
                        image: url
                    })
                })
                setSuccessMsg('You Have Success Fully Added')
            })

    }

    return (
        <div>
            {user && user.email == 'Nitihchoudhary8696@gmail.com' ?
                <div className='addproduct'>
                    <form className='pro-details rounded-md w-[350px] border border-gray-300 shadow-md"' onSubmit={handleAddProduct}>
                        <p className='text-2xl font-medium'>Add Product</p>
                        {successMsg && <div>{successMsg}</div>}
                        {uploadError && <div>{uploadError}</div>}
                        <div className='flex flex-col'>
                        <label className='font-medium text-sm'>Product Title</label>
                        <input type="text" className='outline-none border border-gray-600 rounded-md p-1'  onChange={(e) => setTitle(e.target.value)} placeholder='Product Title' />
                        </div>

                        <div className='flex flex-col'>
                        <label className='font-medium text-sm'>Product Type</label>
                        <input type="text" className='outline-none border border-gray-600 rounded-md p-1'  onChange={(e) => setCategory(e.target.value)} placeholder='Product Type' />
                        </div>

                        <div className='flex flex-col'>
                        <label className='font-medium text-sm'>Product Descpription</label>
                        <textarea type="text" className='outline-none border border-gray-600 rounded-md p-1'  onChange={(e) => setDescription(e.target.value)} placeholder='Product Descpription' />
                        </div>

                        <div className='flex flex-col'>
                        <label className='font-medium text-sm'>Product Price</label>
                        <input type="text" className='outline-none border border-gray-600 rounded-md p-1'  onChange={(e) => setPrice(e.target.value)} placeholder='Product Price' />
                        </div>

                        <div className='flex flex-col'>
                        <label className='font-medium text-sm'>Product Image</label>
                        <input type="file" className='outline-none border border-gray-600 rounded-md p-1'  multiple onChange={handleProductImg} accept="image/*" />
                        </div>
                        {imageError && <div>{imageError}</div>}
                        <button className='submit font-medium bg-yellow-500 p-1 rounded-md hover:bg-yellow-400'>Add</button>
                    </form>
                </div> :
                <div>You Don't have access to this Area</div>}
        </div>
    )
}

export default Addproduct
