import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dropdown from "../assets/dropdown_icon.svg";
import menu from "../assets/menu_icon.svg";
import cross_icon from "../assets/cross_icon.png";
import axios from 'axios';
import {toast} from 'react-toastify';
import {useContextData} from '../context/Context'

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);
  const api=import.meta.env.VITE_BACKEND_API
  const navigate = useNavigate(null);
  const {user}=useContextData()

  const logoutHandler=()=> {
    axios.delete(`${api}/auth/logout-user`).then(res=>{
      toast.success(res.data.msg)
      navigate('/')
    }).catch(err=>toast.error(err.response.data?.msg))
  }

  return (
    <div className="md:mx-10 mx-4">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-2xl font-medium text-primary cursor-pointer" onClick={()=>navigate('/home')}>News Aggregator</h1>

        
        
        <div className="flex gap-1">
           {user?.username?<div className="group relative flex gap-1 cursor-pointer">
            <p className="bg-primary px-3 py-1 rounded-full text-white font-semibold text-xl">{user?.username.slice(0,1)}</p>
            <img src={dropdown} alt="" width="8px" />
            <div className="absolute hidden group-hover:block top-8 right-0 z-20">
              <div className="bg-gray-400 rounded-md px-4 w-48 py-2 text-white mt-2">
                <p
                  onClick={() => navigate("/profile")}
                  className="hover:text-black font-medium transition-all duration-500"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate("/saved-bookmarks")}
                  className="hover:text-black font-medium transition-all duration-500"
                >
                  Saved Bookmarks
                </p>
                <p className="hover:text-black font-medium transition-all duration-500" onClick={logoutHandler}>
                  Logout
                </p>
              </div>
            </div>
          </div>: <button className="bg-primary text-white px-4 py-1 rounded-full hover:bg-primary/50">Login</button>}

          <img
            src={menu}
            alt="menu"
            width="28px"
            className="md:hidden"
            onClick={() => setIsShow(true)}
          />
        </div>
      </div>
      <hr className="h-[1.5px] bg-gray-400" />

      <div
        className={`${
          isShow ? "fixed w-full" : "h-0 w-0"
        } top-0 right-0 bg-white transition-all duration-500 z-10`}
      >
        <div
          className={`${
            isShow ? "flex flex-col mx-10 h-[100vh] mt-8 gap-6" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-primary">
              News Aggregator
            </h1>
            <img
              src={cross_icon}
              alt="close"
              width="30px"
              onClick={() => setIsShow(false)}
              className="cursor-pointer"
            />
          </div>
          <ul className="flex flex-col items-center gap-2">
            <NavLink to="/home" onClick={() => setIsShow(false)}>
              <p>HOME</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

