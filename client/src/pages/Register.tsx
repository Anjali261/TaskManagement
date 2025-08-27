import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { saveToken } from '../utils/auth'


export default function Register(){
const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')
const navigate = useNavigate()


const submit = async (e:React.FormEvent)=>{
e.preventDefault()
setError('')
try{
  await api.post('/auth/register',{name,email,password})
  alert('Registration successful! Please login.');

navigate('/login')
}catch(err:any){
setError(err.response?.data?.message || err.message)
}
}


return (
<div className="flex items-center justify-center h-screen">
<form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
<h2 className="text-2xl font-semibold mb-4">Register</h2>
{error && <div className="text-sm text-red-600 mb-2">{error}</div>}
<label className="block mb-2">
<span className="text-sm">Name</span>
<input value={name} onChange={(e)=>setName(e.target.value)} className="w-full mt-1 p-2 border rounded" />
</label>
<label className="block mb-2">
<span className="text-sm">Email</span>
<input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" />
</label>
<label className="block mb-4">
<span className="text-sm">Password</span>
<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" />
</label>
<button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
<p className="mt-3 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
</form>
</div>
)
}