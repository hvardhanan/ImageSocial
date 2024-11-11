import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import bgVid from '../assets/bgVid.mp4'
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const {name, sub, picture} = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
    localStorage.setItem('user', decoded);
    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', { replace: true })
    })
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  return (
    <div className = "flex justify-start items-center flex-col h-screen">
      <div className='relative w-full h-full'>
        <video 
          src = { bgVid }
          type = "video/mp4"
          loop
          controls = {false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30">
        <h1 className='p-5 text-amber-400 font-sans font-bold' >Login to access the content</h1>
        <div className='shadow-2xl'>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
