import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useContextData } from '../context/Context';
import {useNavigate} from 'react-router-dom'
import verified_icon from '../assets/verified_icon.svg'
import cross_icon from '../assets/cross_icon.png'
import {category} from '../assets/assets'

const Login = () => {
  const {user,setUser}=useContextData()
  const api=import.meta.env.VITE_BACKEND_API
  const [isRegister,setIsRegister]=useState(false)
  const navigate=useNavigate(null)
  const [data,setData]=useState({
    username:'',
    email:'',
    password:''
  })
  const [preferences,setPreferences]=useState([])
  const [isShow,setIsShow]=useState(false)
  const [otp,setOtp]=useState('')
  const [isVerified,setIsVerified]=useState(false)

  const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const registerFuntion=()=> {
    axios.post(`${api}/auth/register-user`,data).then(res=>{
      setData({
        username:'',
        email:'',
        password:'',
        preferences
      })
      toast.success(res.data.msg)
      setIsRegister(false)
    }).catch(err=>toast.error(err.response.data?.msg ||"Something went wrong"))
  }
  const loginFuntion=()=>{
    const {email,password}=data
    axios.post(`${api}/auth/login-user`,{email,password},{withCredentials:true}).then(res=>{
      setData({
        username:'',
        email:'',
        password:''
      })
      setUser(res.data.user)
      navigate('/home')
      toast.success(res.data.msg)
    }).catch(err=>toast.error(err.response.data?.msg))
  }

  const checkboxChangeHandler=(e)=> {
    if(e.target.checked)
      setPreferences([...preferences,e.target.value])
    else 
      setPreferences(prev=>{
        return prev.filter(each=>each!==e.target.value)
    })
  }

  const sendOtp=()=> {
    const {email}=data
    if(!email) 
      return alert("Please enter email")
    axios.post(`${api}/email-auth/send-otp`,{email}).then(res=>{
      toast.success(res.data.msg)
      setIsShow(true)
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }
  
  const verifyOtp=(e)=> {
    e.preventDefault()
    const {email}=data
    axios.post(`${api}/email-auth/verify-otp`,{email,otp:otp}).then(res=>{
      setIsShow(false)
      setIsVerified(true)
      toast.success(res.data.msg)
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }

  return (
    <>
    <div className='min-h-[75vh] flex justify-center items-center my-6'>
      <form className='border border-slate-300 rounded-lg shadow-lg p-8 flex flex-col gap-3 md:w-96 sm:w-[75%]' onSubmit={(e)=>e.preventDefault()}>
        <h1 className='text-2xl font-medium text-gray-700'>{isRegister?'Create Account':'Login'}</h1>
        <p className='text-sm text-gray-500'>Please {isRegister?'sign up':'log in'} to book appointment</p>
         {isRegister &&  <div className='flex flex-col'>
          <label htmlFor='name' className='text-sm text-gray-700'>Full Name</label>
          <input type='text' id='name'className='border-b border-b-slate-500 outline-none py-1' placeholder='Enter full name' required name='username' value={data.username} onChange={changeHandler}/>
          </div>}

          <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm text-gray-700'>Email</label>
          <div className='relative'>
          <input type='email' id='email' className='border-b border-b-slate-500 outline-none py-1 w-full' placeholder='Enter email' required name='email' value={data.email} onChange={changeHandler} />
          {isRegister && <div className='absolute right-0 bottom-2'>
            {isVerified?<img src={verified_icon} alt="verified" width="18px" title='verified' className='cursor-pointer'/>:<button className='px-4 py-1 1 rounded-[4px] bg-primary text-white text-sm' onClick={sendOtp}>Send OTP</button>}
            </div>}
          </div>
          </div>

          <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm text-gray-700'>Password</label>
          <input type='password' id='password' className='border-b border-b-slate-500 outline-none py-1' placeholder='Enter password' required name='password' value={data.password} onChange={changeHandler}/>
          </div>

          <label htmlFor='preferences' className='text-sm text-gray-700'>Preferences</label>
          {isRegister && <div className='flex gap-2 flex-wrap'>
            {category.map(eachItem=>{
              return <div key={eachItem} className={`border border-gray-700 px-4 rounded-full text-sm ${preferences.includes(eachItem)?'bg-primary text-white':''}`}>
                <input type='checkbox' value={eachItem} id={eachItem} className='hidden' onChange={checkboxChangeHandler}/>
                <label htmlFor={eachItem} className='cursor-pointer'>{eachItem}</label>
              </div>
            })}
          </div>}
          

          {isRegister?<button className='bg-primary py-2 rounded text-white' onClick={registerFuntion}>Create account</button>:<button className='bg-primary py-2 rounded text-white' onClick={loginFuntion}>Login</button>}
         
          {isRegister?<p className='text-sm text-slate-600'>Already have an account ?<span className='text-blue-500 underline cursor-pointer' onClick={()=>setIsRegister(false)}> Login here</span></p>:<p className='text-sm text-slate-600'>Create an new account ?<span className='text-blue-500 underline cursor-pointer' onClick={()=>setIsRegister(true)}> Click here</span></p>}
      </form>
    </div>

    {isShow && <div className=' fixed top-0 bottom-0 w-full h-[100vh] bg-white flex justify-center items-center'>
      <div className='bg-white rounded-md p-4 shadow-lg border border-indigo-300'>
        <div className='flex justify-end'>
          <img src={cross_icon} alt="clear" width="28px" className='cursor-pointer' onClick={()=>setIsShow(false)}/>
        </div>
        <h1 className='text-center text-xl font-medium text-gray-700 my-4'>Verify OTP</h1>
        <form className='flex flex-col items-center gap-4' onSubmit={verifyOtp}>
          <input type='text' placeholder='Enter otp here' value={otp} onChange={(e)=>setOtp(e.target.value)} className='border border-gray-900 py-1 rounded-sm outline-none px-1'/>
          <button type="submit" className='bg-primary hover:bg-indigo-200 text-white hover:text-black px-6 py-1 rounded-full transition-all duration-500 hover:scale-105'>Verify</button>
        </form>
      </div>
    </div>}
    </>
  )
}

export default Login