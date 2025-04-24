import React, { useState } from "react";
import { useContextData } from "../context/Context";
import { category } from "../assets/assets";
import axios from "axios";
import {toast} from 'react-toastify'

const ProfilePage = () => {
  const { user,getUserDetails } = useContextData();
  const [isEdit, setIsEdit] = useState(false);
  const [preferences,setPreferences]=useState([])
  const api=import.meta.env.VITE_BACKEND_API

  const checkboxChangeHandler=(e)=> {
    if(e.target.checked)
      setPreferences([...preferences,e.target.value])
    else 
      setPreferences(prev=>{
      return prev.filter(each=>each!==e.target.value)
       })
   }

   const saveUpdates=()=> {
    axios.put(`${api}/auth/update-preferences`,{preferences},{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      getUserDetails()
    }).catch(err=>toast.error(err.response.data?.msg))
   }


  return (
    <div className="md:mx-10 mx-4">
      <h1 className=" my-2 text-2xl text-gray-900">User Profile</h1>

      <p className="text-gray-700">
        Username :{" "}
        <span className="text-xl text-gray-950 font-medium">
          {user?.username}
        </span>
      </p>
      <p className="text-gray-700 my-2">
        Email : <span className="text-gray-950 font-medium">{user?.email}</span>
      </p>

      <p className="text-xl text-gray-800 mb-1">Preferences</p>

     {!isEdit &&  <div className="flex gap-4">
        {user?.preferences?.length > 0 &&
          user?.preferences?.map((eachItem, index) => {
            return <p key={index} className="border border-slate-400 rounded-full px-4 py-1 text-sm">{eachItem}</p>
          })}
      </div>}

      {user?.username && !isEdit && (
        <button
          className="bg-primary text-white px-6 my-4 py-1 rounded-md hover:bg-primary/50 hover:transition-all hover:duration-500 hover:rounded-full hover:text-black"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      )}

      {isEdit && <div className="flex gap-4 flex-wrap w-[60%]">
        {isEdit &&
          category.map((eachItem) => {
            return (
              <div
                key={eachItem}
                className={`border border-gray-700 px-4 rounded-full text-sm py-1 ${preferences.includes(eachItem)&&'bg-primary text-white'}`}
              >
                <input
                  type="checkbox"
                  value={eachItem}
                  id={eachItem}
                  className="hidden"
                  onChange={checkboxChangeHandler}
                />
                <label htmlFor={eachItem} className="cursor-pointer">
                  {eachItem}
                </label>
              </div>
            );
          })}
      </div>}

      {isEdit && <button className="bg-primary text-white px-6 my-4 py-1 rounded-md hover:bg-primary/50 hover:transition-all hover:duration-500 hover:rounded-full hover:text-black" onClick={saveUpdates}>Save</button>}
    </div>
  );
};

export default ProfilePage;
