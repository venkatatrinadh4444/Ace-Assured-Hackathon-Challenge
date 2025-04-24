
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import bookmarkImg from '../assets/bookmark.svg'
import bookmarkOutline from '../assets/bookmark-outline.svg'
import { useContextData } from '../context/Context';
import {toast} from 'react-toastify'


const News = ({data}) => {
  const api=import.meta.env.VITE_BACKEND_API
  const [bookmarks,setBookmarks]=useState([])
  const {user}=useContextData()

  const gettingBookmarks=()=> {
    axios.get(`${api}/auth-bookmarks/get-bookmarks`,{withCredentials:true}).then(res=>setBookmarks(res.data)).catch(err=>setBookmarks([]))
}

const addBookmark=(eachBookmark)=> {
  console.log(eachBookmark)
  const {urlToImage,title,publishedAt,url}=eachBookmark
    if(!user.username)
      return navigate('/')
    axios.post(`${api}/auth-bookmarks/add-bookmark`,{urlToImage,title,publishedAt,url},{withCredentials:true}).then(res=>{
      toast(res.data.msg)
      gettingBookmarks()
    }).catch(err=>toast.error(err.response.data?.msg))
  }

  const removeBookmark=(titleValue)=> {
    if(!user.username)
      return navigate('/')
    axios.delete(`${api}/auth-bookmarks/delete-bookmark/${titleValue}`,{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      gettingBookmarks()
    }).catch(err=>toast.error(err.response.data?.msg))
  }

  useEffect(()=> {
    gettingBookmarks()
  },[])

  return (
    <div className='flex flex-wrap gap-5 justify-center my-6 md:mx-10 mx-4'>
         {data?.length>0 && data?.map((eachItem,index)=> {
           return <div key={index} className='w-[80%] sm:w-64 rounded-md shadow-md shadow-indigo-200 hover:scale-105 transition-all duration-500'>
            <img src={eachItem.urlToImage} alt={eachItem.author} className='rounded-t-md w-full h-[180px]'/>
            <p className='text-gray-900 px-2 mb-2 font-medium'>{eachItem.title}</p>

            <div className='flex justify-between pr-4 pl-2 items-center'>
            <p className='text-sm text-gray-800'>{moment(eachItem.publishedAt).format('MMM DD,YYYY')}</p>

            <img src={bookmarks.find(each=>each.title===eachItem.title)&&bookmarkImg} alt="bookmark" width="22px" className={`cursor-pointer ${bookmarks.find(each=>each.title===eachItem.title)?'':'hidden'}`} onClick={()=>removeBookmark(eachItem.title)}/>

            <img src={bookmarks.find(each=>each.title===eachItem.title)?bookmarkImg:bookmarkOutline} alt="bookmark" width="22px" className={`cursor-pointer ${!bookmarks.find(each=>each.title===eachItem.title)?'':'hidden'}`} onClick={()=>addBookmark(eachItem)}/>

            </div>

            <div className='text-center my-3 text-white group'>
            <a href={eachItem.url} target="_blank" className='bg-orange-500 px-4 py-1 rounded-full group-hover:text-white group-hover:bg-black group-hover:transition-all group-hover:duration-500'>Read More</a>
            </div>
           </div>
         })}
    </div>
   
  )
}

export default News