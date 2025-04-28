import { Button, Slide } from '@mui/material'
import React, { useState } from 'react'
import './Login.css';
import { FaLockOpen, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Tost.css';
const Signin = () => {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault();// prevent form refresh
      
      if (username.length < 3) {
        alert('Username must be at least 3 characters long')
        return
      }
  
      if (password.length < 6) {
        alert('Password must be at least 6 characters long')
        return
      }

      try {
        const res = await axios.post('http://localhost:3004/sign', { username, password });
        toast.success(res.data.message); // show success toast
        setUsername('');
        setPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 1000); // redirect to login after successful registration
      } 
      catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      }
    };
    
      
  return (
    
    <div className='wrapper'>
    <form onSubmit={handleSubmit}>

      <h1>SignIn</h1>

      <div className="input-box">
        <input type="text" placeholder='Username'
          autoComplete='off'
          value={username}
          onChange={(e) => setUsername(e.target.value)}  required />
        <FaUser className='icon' />
      </div>


      <div className="input-box">
        <input type="password" placeholder='Password' 
          autoComplete='off'
        value={password}
        onChange={(e)=> setPassword(e.target.value)} required />
        <FaLockOpen className='icon' />
      </div>

      <Button type="submit"  variant="contained" 
          color="primary"
          fullWidth
          sx={{ mt: 2 }}>SignIn</Button>
</form>

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

export default Signin
