

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { category, country, languages } from '../assets/assets'
import News from './News'
import { toast } from 'react-toastify'

const Sources = () => {
    const [data,setData]=useState([])
    const [startIndex,setStartIndex]=useState(0)
    const [endIndex,setEndIndex]=useState(20)
    const [page,setPage]=useState(1)
    const [searchValue,setSearchValue]=useState('')
    const apiKey=import.meta.env.VITE_API_URI
    const sortOptions=["relevancy", "popularity", "publishedAt"]

    const gettingNewsSources=()=> {
        axios.get(`https://newsapi.org/v2/everything?q='bitcoin'&apiKey=${apiKey}`).then(res=>setData(res.data.articles)).catch(err=>console.log(err))
    }
    useEffect(()=>{
        gettingNewsSources()
    },[])

    
    const incrementFuntion=()=> {
        setStartIndex(prev=>prev+20)
        setEndIndex(prev=>prev+20)
        setPage(prev=>prev+1)
    }
    const decrementFuntion=()=> {
        setStartIndex(prev=> {
            if(prev===0)
                return;
            return prev-20
        })
        setEndIndex(prev=> {
            if(prev===20)
                return;
            return prev-20
        })
        setPage(prev=> {
            if(prev===1)
                return;
            return prev-1
        })
    }

    const sortByOptions=(e)=> {
        axios.get(`https://newsapi.org/v2/everything?q=news&sortBy=${e.target.value}&apiKey=${apiKey}`).then(res=>{
          setData(res.data.articles)
          toast(`Showing news based ${e.target.value}`)
        }).catch(err=>console.log(err))
    } 

    const languageChangeHandler=(e)=> {
        axios.get(`https://newsapi.org/v2/everything?q=news&language=${e.target.value}&apiKey=${apiKey}`).then(res=>{
          setData(res.data.articles)
          toast(`Showing ' ${e.target.value} ' language news`)
        }).catch(err=>console.log(err))
    } 

    const seachHandler=()=> {
        axios.get(`https://newsapi.org/v2/everything?q=title&q=${searchValue}&apiKey=${apiKey}`).then(res=>{
          setData(res.data.articles)
          setSearchValue('')
        }).catch(err=>console.log(err))
    }


  return (
    <div>
     {/* search bar */}
     <div className="flex flex-col items-center justify-center my-4 gap-1">
        <input
          type="search"
          placeholder="Search by keyword"
          className="border border-slate-500 rounded-full py-1 px-2 outline-none" 
          value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} 
        />
        <button className="bg-primary text-white px-4 py-1 rounded-full" onClick={seachHandler}>
          Search
        </button>
      </div>

      {/* Filter options */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">

        <select className="border border-slate-300 rounded-md px-3 py-2 shadow-lg outline-none" onChange={sortByOptions}>
          <option defaultChecked value="publishedAt">Sort by options</option>
          {sortOptions.map((eachItem) => {
            return (
              <option value={eachItem} key={eachItem}>
                {eachItem}
              </option>
            );
          })}
        </select>

        <select className="border border-slate-300 rounded-md px-3 py-2 shadow-lg outline-none" onChange={languageChangeHandler}>
          <option defaultChecked value="en">Filter by Language</option>
          {languages.map((eachItem) => {
            return (
              <option value={eachItem} key={eachItem}>
                {eachItem}
              </option>
            );
          })}
        </select>
      </div>

      <News data={data?.slice(startIndex,endIndex)}/>


    {data?.length>0 && <div className='flex justify-center gap-4 mt-4'>
        <button className={`bg-black text-white px-3 rounded-md py-1`} onClick={decrementFuntion}disabled={startIndex===0?true:false}>-</button>
        <p className='text-xl font-medium'>{page}</p>
        <button className='bg-black text-white px-3 rounded-md py-1 font-medium text-xl' onClick={incrementFuntion} disabled={Math.ceil(data.length/20)===page&&true}>+</button>
        </div>}
        {data.length>0 && <p className='text-center text-xl mb-10 mt-2'>Total Results : {data.length}</p>}
    </div>
  )
}

export default Sources