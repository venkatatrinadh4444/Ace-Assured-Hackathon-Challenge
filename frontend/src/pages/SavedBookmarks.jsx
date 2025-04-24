import React, { useEffect, useState } from 'react'
import News from '../components/News'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContextData } from '../context/Context'

const SavedBookmarks = () => {
    const {user}=useContextData()
    const api=import.meta.env.VITE_BACKEND_API
    const [bookmarks,setBookmarks]=useState([])

    const gettingBookmarks=()=> {
        axios.get(`${api}/auth-bookmarks/get-bookmarks`,{withCredentials:true}).then(res=>{
            setBookmarks(res.data)
            gettingBookmarks()
        }).catch(err=>toast.error(err=>toast.error(err.response.data?.msg)))
    }
    useEffect(()=>{
        gettingBookmarks()
    },[])

  return (
    <div>
        <h1 className='text-center text-2xl my-2 text-gray-800'>Saved Bookmarks</h1>

        {bookmarks.length>0 && <News data={bookmarks}/>}

        {!bookmarks.length>0 && <div className='text-center my-8'>
            <h1 className='text-xl text-indigo-800'>No saved bookmarks</h1>
            <p className='text-gray-600'>Please add some bookmarks to show here.</p>
            </div>}
    </div>
  )
}

export default SavedBookmarks