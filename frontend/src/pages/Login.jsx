import React ,{ useState , useEffect } from 'react'
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [error , setError] = useState("");
  const [formData , setFormData] = useState({email : "" , Password:""})
  const navigate = useNavigate()
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
   try {
    await loginUser(formData);
    navigate("/dashboard")
   } catch (error) {
    setError(error.message || "Failed to Login !")
   }
  }

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
  }

  return (
    <div className="flex items-center justify-center h-screen bg-stone-900">
            <div className="w-96 p-6 bg-stone-100 rounded-lg shadow-lg flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="input-field" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input className="input-field" type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button className="btn-primary" type="submit">Login</button>
                </form>
            </div>
        </div>
  )
}

export default Login