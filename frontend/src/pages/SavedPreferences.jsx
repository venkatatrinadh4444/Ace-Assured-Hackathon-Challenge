import React, { useState, useEffect } from "react";
import { useContextData } from "../context/Context";
import News from "../components/News";
import axios from "axios";

const SavedPreferences = () => {
  const { user } = useContextData();
  const [savedPreferences, setSavedPreferences] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_API_URI;

  const gettingSavedPreferences = async () => {
    const catagories = user.preferences;
    catagories?.map((eachCategory) => {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?category=${eachCategory}&apiKey=${apiKey}`
        )
        .then((res) => savedPreferences.push(res.data.articles))
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    gettingSavedPreferences();
    setTimeout(() => {
      incrementFuntion();
    }, 500);
  }, []);

  const incrementFuntion = () => {
    setStartIndex((prev) => prev + 10);
    setEndIndex((prev) => prev + 10);
    setPage((prev) => prev + 1);
  };

  const decrementFuntion = () => {
    setStartIndex((prev) => {
      if (prev === 0) return;
      return prev - 10;
    });
    setEndIndex((prev) => {
      if (prev === 10) return;
      return prev - 10;
    });
    setPage((prev) => {
      if (prev === 1) return;
      return prev - 1;
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-medium text-center my-2">
        News based on your Saved Preferences
      </h1>

      {savedPreferences.length > 0 && (
        <News data={savedPreferences?.flat()?.slice(startIndex, endIndex)} />
      )}

      <div className="flex justify-center gap-4 mt-4">
        <button
          className={`bg-black text-white px-3 rounded-md py-1 disabled:bg-gray-400`}
          onClick={decrementFuntion}
          disabled={startIndex === 0 ? true : false}
        >
          -
        </button>
        <p className="text-xl font-medium">{page}</p>
        <button
          className="bg-black text-white px-3 rounded-md py-1 font-medium text-xl disabled:bg-gray-400"
          onClick={incrementFuntion}
          disabled={
            Math.ceil((savedPreferences?.flat()?.length / 100) * 10) === page
          }
        >
          +
        </button>
      </div>

      <p className="text-center text-xl mb-10 mt-2">
        Total Results : {savedPreferences?.flat()?.length}
      </p>
    </div>
  );
};

export default SavedPreferences;
