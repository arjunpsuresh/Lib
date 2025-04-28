import React, { useEffect, useState } from 'react'
import { FaUser,FaLockOpen } from "react-icons/fa";
import './Login.css';
import { Button, Slide, sliderClasses } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Tost.css';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // UseEffect hook to clear fields when the component mounts
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const res = await axios.post('http://localhost:3004/login', { username, password });
      toast(res.data.message); // success message
      console.log(res.data);
    }
     catch (error) {
      if (error.response) {
        toast.error(error.response.data.message) ; // show warning from backend

      } else {
        toast.error('Something went wrong, please try again.');
      }
    }
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>

        <h1>Login</h1>

           <div className="input-box">
              <input type="text" placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              required />
              <FaUser className='icon' />
            </div>


          <div className="input-box">
              <input type="password" placeholder='Password' 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required />
              <FaLockOpen className='icon' />
            </div>

        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <Button type="submit" >Login</Button>

        <div className="register-link">
          <p>Don't have an account? <a href='/sign' >Register</a></p>
        </div>
      </form>

       {/* Toast Container */}
       <ToastContainer
        
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
          newestOnTop={true}
          theme="dark"
          closeButton={false}
          
        
        />
      
    </div>
  )
}

export default Login
