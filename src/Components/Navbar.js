import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsHandbag } from 'react-icons/bs'
import { FaBars, FaUserCircle } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai'
import { MdCategory } from 'react-icons/md'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from "firebase/auth";
import { auth } from '../FirebaseConfigs/FirebaseConfig'
import { updateQuery } from '../features/filterSlice'
import { motion } from 'framer-motion'

import './css/Navbar.css'

const Navbar = () => {
    const { user } = useSelector((store) => store.user)
    const { cart } = useSelector((store) => store.cart)
    const navigate = useNavigate()
    const divRef = useRef(null);
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([
        {
            id: 1,
            category: 'shoes'
        },
        {
            id: 2,
            category: 'mobiles'
        },
        {
            id: 3,
            category: 'laptops'
        },
        {
            id: 4,
            category: 'cameras'
        },
    ])

    const [toggle, setToggle] = useState(false)
    const [mobNav, setMobNav] = useState(false)
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (!divRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/login')
        })
    }
    const handleClick = () => {
        if (!toggle) {
            setToggle(true)
        }
    }
    useEffect(() => {
        dispatch(updateQuery(query))
    }, [query])

    const divStyle = {
        backgroundColor: toggle ? 'White' : '#F5F5F6',
        border: toggle ? '1px solid #F5F5F6' : 'none',
    };
    const inputStyle = {
        backgroundColor: !toggle ? 'white' : '#F5F5F6'
    }
    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
            <nav className='nav bg-[#131a22] w-full overflow-hidden'>
                <div className='nav-center'>
                    <div className='categories py-5'>
                        {categories.map((category) => {
                            return <Link key={category.id} to={`/category/${category.category}`}><button className='font-serif'>{capitalizeFirstLetter(category.category)}</button></Link>
                        })}
                    </div>
                    <div className='toggle pl-5' onClick={() => setMobNav(true)} >
                        <FaBars className='text-white' />
                    </div>
                    {mobNav && <motion.div className='categories-mob pl-4 pt-4' initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: .5 }}
                    >
                        <div className='w-full mob-sidebar'>
                            <div className='flex gap-1 items-center'>
                                <MdCategory className='text-xl font-semibold' />
                                <p className='text-xl font-semibold'>Categories</p>
                            </div>
                            {categories.map((category) => {
                                return <Link key={category.id} to={`/category/${category.category}`}
                                    onClick={() => setMobNav(false)} className='hover:bg-blue-300 hover:pl-2 duration-200 group'
                                >
                                    <motion.button className='group-hover:text-white' whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}>{category.category}</motion.button></Link>
                            })}
                            <hr />
                            <Link to='/' className='hover:bg-blue-300 hover:pl-2 duration-200 group' onClick={() => setMobNav(false)}><button className='group-hover:text-white'>Home</button></Link>
                            <Link to='/sellproduct' className='hover:bg-blue-300 hover:pl-2 duration-200 group' onClick={() => setMobNav(false)}><button className='group-hover:text-white'>Sell</button></Link>
                            {!user && <Link to='/signup' className='hover:bg-blue-300 hover:pl-2 duration-200 group' onClick={() => setMobNav(false)}><button className='group-hover:text-white'>Register</button></Link>}
                            {!user && <Link to='/login' className='hover:bg-blue-300 hover:pl-2 duration-200 group' onClick={() => setMobNav(false)}><button className='group-hover:text-white'>Login</button></Link>}
                            <hr />
                            <div className='mob-profile items-center group  hover:bg-blue-300 hover:pl-2 duration-200' >
                                <div>
                                    <FaUserCircle className='profile-icon hover:text-white group-hover:text-white' />
                                </div>
                                <div>
                                    <Link to='/userprofile' className=' hover:text-white group-hover:text-white' onClick={() => setMobNav(false)}>
                                        Profile
                                    </Link>
                                </div>
                            </div>
                            <Link onClick={handleLogout}>Logout</Link>
                        </div>
                        <RxCrossCircled className='absolute top-4 right-1 text-xl cursor-pointer' onClick={() => setMobNav(false)} />
                    </motion.div>}
                    <form className="flex items-center w-[500px] ml-2 box-content rounded-sm" style={divStyle} ref={divRef}>
                        <AiOutlineSearch className='search-icon box-content cursor-pointer' />
                        <input type="text" className='search-input rounded-sm outline-none p-1' value={query} onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search for products,brand'
                            style={inputStyle} onFocus={() => setToggle(true)} />
                    </form>
                    <div className='flex gap-2 sm:gap-5 px-2'>
                        <Link to='/' className='py-5 home'><button>Home</button></Link>
                        <Link to='/sellproduct' className='py-5 sell'><button>Sell</button></Link>
                        {!user && <Link to='/signup' className='py-5 register'><button>Register</button></Link>}
                        {!user && <Link to='/login' className='py-5 login'><button>Login</button></Link>}
                        <div className="py-5 gap-5 hidden sm:flex">
                            <Link onClick={handleLogout} className='text-white'>Logout</Link>
                            <Link to='/userprofile'>
                                <FaUserCircle className='profile-icon' />
                            </Link>
                        </div>
                        <Link to='/wishlist' onClick={handleClick} className='py-5'>
                            <AiOutlineHeart className='text-white text-2xl' />
                        </Link>
                        <Link to='/cart' className='cart relative py-5 pr-1'>
                            <div className="cart-btn">
                                <BsHandbag className='cart-icon' />
                                <span className='cart-icon-css rounded-full hover:scale-95'>{cart.length}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
