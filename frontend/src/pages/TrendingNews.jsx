import React, { useEffect, useState } from "react";
import axios from "axios";
import { category } from "../assets/assets";
import { country } from "../assets/assets";
import News from "../components/News";

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState({});
  const [pageNo, setPageNo] = useState(1);
  const apiKey=import.meta.env.VITE_API_URI

  
  const gettingTrendingNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&page=${pageNo}&pageSize=10&apiKey=${apiKey}`
      )
      .then((res) => setTrendingNews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    gettingTrendingNews()
  }, [pageNo]);

  return (
    <div>
      <h1 className="text-2xl font-medium text-center my-2">Trending News</h1>


      <News data={trendingNews?.articles}/>

      <div className="flex justify-center gap-4 my-4">
        <button
          className={`bg-black text-white px-3 rounded-md py-1`}
          onClick={() => setPageNo(pageNo - 1)}
          disabled={pageNo === 1}
        >
          -
        </button>
        <p className="text-xl font-medium">{pageNo}</p>
        <button
          className="bg-black text-white px-3 rounded-md py-1 font-medium text-xl"
          onClick={() => setPageNo(pageNo + 1)} disabled
        >
          +
        </button>
      </div>
      <p className="text-center text-xl mb-10 mt-2">
        Total Results :{trendingNews?.totalResults}
      </p>
    </div>
  );
};

export default TrendingNews;
