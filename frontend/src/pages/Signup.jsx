import React, { useState } from 'react'
import { signupUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData , setFormData] = useState({name :"" , email : "" , password :""});
  const [error ,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await signupUser(formData);
      navigate("/login")
    } catch (error) {
      setError(error.message || "Registration Failed !");
    }
  };

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value });
  }

  return (
    <div className='flex items-center justify-center h-screen bg-stone-900'>
      <div className='w-80  p-6 bg-stone-100 rounded-lg shadow-lg'>
        <h2>SignUP</h2>
        {error && <p className='text-red-500 text-sm text-center flex flex-col gap-3'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
        <input className='input-field' type="text" name='name' placeholder='Name' onChange={handleChange} required/>
        <input className='input-field' type="text" name='email' placeholder='Email' onChange={handleChange} required/>
        <input className='input-field' type="text" name='password' placeholder='Password' onChange={handleChange} required/>
        <button className='btn-primary' type='submit'> Register</button>
        </form>
      </div>
    </div>
  )
}

export default Signup