import React, { useState, useEffect, useCallback } from "react";
import ImageSlider from "../components/ImageSlider";
import axios from "axios";
import rightArrow from "../assets/arrow-forward-outline.svg";
import { category } from "../assets/assets";
import { Navigate, NavLink } from "react-router-dom";
import { languages } from "../assets/assets";
import { country } from "../assets/assets";
import { useContextData } from "../context/Context";
import Sources from "../components/Sources";
import { useNavigate } from "react-router-dom";

const LandinPage = () => {
  const [topHeadlines, setTopHeadlines] = useState({});
  const [trendingNews, setTrendingNews] = useState({});
  const [preferenceNews, setPreferenceNews] = useState({});
  const [savedPreferences, setSavedPreferences] = useState([]);
  const navigate=useNavigate(null)
  const apiKey=import.meta.env.VITE_API_URI
  const api=import.meta.env.VITE_BACKEND_API

  const [preferenceValue, setPreferenceValue] = useState("business");

  const [pageNo, setPageNo] = useState(1);
  const { user } = useContextData();

  const gettingTopHeadlines = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&page=${pageNo}&pageSize=10&apiKey=${apiKey}`
      )
      .then((res) => setTopHeadlines(res.data))
      .catch((err) => console.log(err));
  };

  const gettingTrendingNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&page=${pageNo}&pageSize=10&apiKey=${apiKey}`
      )
      .then((res) => setTrendingNews(res.data))
      .catch((err) => console.log(err));
  };

  const gettingPreferenceNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${preferenceValue}&page=${pageNo}&pageSize=10&apiKey=${apiKey}`
      )
      .then((res) => setPreferenceNews(res.data))
      .catch((err) => console.log(err));
  };

  const gettingSavedPreferences = async() => {
    if (user?.preferences?.length > 0) {
      const catagories=user.preferences
     catagories.map(eachCategory=>{
        axios.get(`https://newsapi.org/v2/top-headlines?category=${eachCategory}&apiKey=${apiKey}`).then(res=>savedPreferences.push(res.data.articles)).catch(err=>console.log(err))
      })
  }
  };

  useEffect(() => {
    gettingTopHeadlines();
    gettingTrendingNews();
    gettingPreferenceNews();
    gettingSavedPreferences();
  }, [preferenceValue, user]);


  const savedPreferencesData={
    articles:savedPreferences.flat().slice(0,20)
  }


  if(!user.username) 
    return <Navigate to="/"/>

  return (
    <div className="md:mx-10 mx-4">
      <div className="flex gap-4 my-3 overflow-x-scroll">
        {category.map((eachItem, index) => {
          return (
            <p
              key={index}
              className={`border border-slate-500 rounded-full px-4 cursor-pointer ${
                preferenceValue === eachItem ? "bg-primary text-white" : ""
              }`}
              onClick={() => {setPreferenceValue(eachItem);scrollTo(0,630)}}
            >
              {eachItem}
            </p>
          );
        })}
      </div>

      <hr className="h-[1.5px] bg-gray-400" />


      {/* Top Headlines */}
      <div className="my-4 text-gray-800">
        <div className="flex justify-between pr-2">
          <h1 className="text-xl">Top Headlines</h1>
          <img
            src={rightArrow}
            alt="rightArrow"
            width="28px"
            className="cursor-pointer"
           onClick={()=>navigate('/top-headlines')}/>
        </div>
        <ImageSlider data={topHeadlines} />
      </div>

      {/* Trending News */}
      <div className="my-4 text-gray-800">
        <div className="flex justify-between pr-2">
          <h1 className="text-xl">Trending news from BBC news</h1>
          <img
            src={rightArrow}
            alt="rightArrow"
            width="28px"
            className="cursor-pointer"
          onClick={()=>navigate('/trending-news')}/>
        </div>
        <ImageSlider data={trendingNews} />
      </div>

      {/* Preferences Page */}
      <div className="my-4 text-gray-800">
        <div className="flex justify-between pr-2">
        <h1 className="text-xl">Top news from <span className="text-2xl text-primary font-medium">{preferenceValue}</span> category</h1>
        <img
            src={rightArrow}
            alt="rightArrow"
            width="28px"
            className="cursor-pointer" onClick={()=>navigate('/preferences')}
          />
        </div>
        <ImageSlider data={preferenceNews} />
      </div>


      {/* User saved preferences */}
      {user?.preferences?.length>0 && <div className="my-4 text-gray-800">
        <div className="flex justify-between pr-2">
          <h1 className="text-xl">Top news from your saved preferences</h1>
          <img
            src={rightArrow}
            alt="rightArrow"
            width="28px"
            className="cursor-pointer" onClick={()=>navigate('/saved-preferences')}
          />
        </div>
        <ImageSlider data={savedPreferencesData} />
      </div>}
      
      {/* Top news from different sources */}
      <div className="my-6 text-gray-800">
          <h1 className="text-3xl font-medium text-center text-primary">Top news across the world</h1>
      <Sources/>
      </div>

    </div>
  );
};

export default LandinPage;

