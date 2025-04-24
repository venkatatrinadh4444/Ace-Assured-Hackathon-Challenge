import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import LandinPage from './pages/LandinPage';
import Headline from './pages/Headline';
import TrendingNews from './pages/TrendingNews'
import Preferences from './pages/Preferences'
import SavedPreferences from './pages/SavedPreferences';
import SavedBookmarks from './pages/SavedBookmarks';
import ProfilePage from './pages/ProfilePage';

const App = () => {  
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<LandinPage/>}/>
      <Route path="/top-headlines" element={<Headline/>}/>
      <Route path="/trending-news" element={<TrendingNews/>}/>
      <Route path="/preferences" element={<Preferences/>}/>
      <Route path="/saved-preferences" element={<SavedPreferences/>}/>
      <Route path="/saved-bookmarks" element={<SavedBookmarks/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
    <ToastContainer/>
    </div>
  )
}

export default App