import React, { useEffect, useState } from "react";
import axios from "axios";
import { category } from "../assets/assets";
import { country } from "../assets/assets";
import News from "../components/News";

const Headline = () => {
  const [topHeadlines, setTopHeadlines] = useState({});
  const [startIndex,setStartIndex]=useState(0)
     const [endIndex,setEndIndex]=useState(10)
     const [page,setPage]=useState(1)
  const apiKey=import.meta.env.VITE_API_URI
  
  const gettingTopHeadlines = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
      )
      .then((res) => setTopHeadlines(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    gettingTopHeadlines();
  }, []);

  const categoryChangeHandler=(e)=> {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${e.target.value}&apiKey=${apiKey}`
      )
      .then((res) => setTopHeadlines(res.data))
      .catch((err) => console.log(err));
  };

  const countyChangeHandler=(e)=> {
    axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=${e.target.value}&apiKey=${apiKey}`
    )
    .then((res) => setTopHeadlines(res.data))
    .catch((err) => console.log(err));
  };

  const incrementFuntion=()=> {
    setStartIndex(prev=>prev+10)
    setEndIndex(prev=>prev+10)
    setPage(prev=>prev+1)
}

const decrementFuntion=()=> {
    setStartIndex(prev=> {
        if(prev===0)
            return;
        return prev-10
    })
    setEndIndex(prev=> {
        if(prev===10)
            return;
        return prev-10
    })
    setPage(prev=> {
        if(prev===1)
            return;
        return prev-1
    })
}

  return (
    <div>
      <h1 className="text-2xl font-medium text-center my-2">Top Headlines</h1>

      <div className="flex justify-center gap-4">
        <select className="border border-slate-300 rounded-md px-3 py-1 shadow-lg outline-none" onChange={categoryChangeHandler}>
          <option defaultChecked value="business">Filter by category</option>
          {category.map((eachItem) => {
            return (
              <option value={eachItem} key={eachItem}>
                {eachItem}
              </option>
            );
          })}
        </select>

        <select className="border border-slate-300 rounded-md px-3 py-1 shadow-lg outline-none" onChange={countyChangeHandler}>
          <option defaultChecked value="us">Filter by country</option>
          {country.map((eachItem) => {
            return (
              <option value="us" key={eachItem}>
                {eachItem}
              </option>
            );
          })}
        </select>
      </div>

      <News data={topHeadlines?.articles?.slice(startIndex,endIndex)}/>

      <div className='flex justify-center gap-4 mt-4'>
        <button className={`bg-black text-white px-3 rounded-md py-1 disabled:bg-gray-400`} onClick={decrementFuntion}disabled={startIndex===0?true:false}>-</button>
        <p className='text-xl font-medium'>{page}</p>
        <button className='bg-black text-white px-3 rounded-md py-1 font-medium text-xl disabled:bg-gray-400' onClick={incrementFuntion} disabled={Math.ceil(topHeadlines?.articles?.length/100*10)===page}>+</button>
    </div>
    
    <p className='text-center text-xl mb-10 mt-2'>Total Results : {topHeadlines?.articles?.length}</p>
    </div>
  );
};

export default Headline;
