import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ContextData=createContext()

const ContextProvider=({children})=> {
    const api=import.meta.env.VITE_BACKEND_API
    const navigate=useNavigate(null)

    const [user,setUser]=useState({})

    const getUserDetails=()=> {
        axios.get(`${api}/auth/get-user`,{withCredentials:true}).then(res=>{
            setUser(res.data)
            navigate('/home')
        }).catch(err=>setUser({}))
    }

    useEffect(()=>{
        getUserDetails()
    },[])

    return <ContextData.Provider value={{user,
        setUser,getUserDetails}}>
        {children}
    </ContextData.Provider>
}

const useContextData=()=> {
    return useContext(ContextData)
}

export {ContextProvider,useContextData}