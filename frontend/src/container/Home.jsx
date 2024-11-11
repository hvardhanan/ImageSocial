import React, { useState, useRef, useEffect } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Pins from './Pins'
import { Sidebar, UserProfile, Login } from '../components'
import logo from '../assets/ImageSocial.png'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'
import { userQuery } from '../utils/data'
import { client } from '../client'


const Home = () => {
  const [ToggleSideBar, setToggleSideBar] = useState(false);
  const [User, setUser] = useState(null);
  const userInfo = localStorage.getItem('user') !== undefined ? localStorage.getItem('user') : localStorage.clear();
  
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    })
  }, [])
  
  
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar/>
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSideBar(false)}/>
        <Link to="/">
          <img src={logo} alt="logo" className='w-20'/>
        </Link>
        <Link to={`user-profile/${User?._id}`}>
          <img src={User?.image} alt="logo" className='w-20'/>
          {console.log(User)}
        </Link>
      </div>
      {/* <img src={logo} alt="ImageSocial Logo" /> */}
    </div>
  )
}

export default Home