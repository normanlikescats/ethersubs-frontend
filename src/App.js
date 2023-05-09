import React from "react";
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Components/Landing';
import About from './Components/About';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Creator from './Components/Creator';
import History from './Components/History';

function App() {
  return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-white text-center bg-gradient-to-b from-bg-purple from-5% to-bg-blue to-95%">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Landing/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/app" element = {<Home/>} />
          <Route path="/profile/:id" element = {<Profile/>} />
          <Route path="/creator/:id" element = {<Creator/>} />
          <Route path="/history" element = {<History/>} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
