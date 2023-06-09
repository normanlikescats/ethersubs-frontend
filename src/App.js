import React from "react";
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Components/Landing';
import About from './Components/About';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Creator from './Components/Creator';
import Transactions from './Components/Transactions';
import PostForm from "./Components/PostForm";
import Error from "./Components/Error";
import Post from "./Components/Post";
import ProfileForm from "./Components/ProfileForm"
import CreatorForm from "./Components/CreatorForm";
import CreatorEditForm from "./Components/CreatorEditForm";
import PostEditForm from "./Components/PostEditFrom";
import TransactionsCreator from "./Components/TransactionsCreator";

function App() {
  return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-white text-center bg-gradient-to-b from-bg-purple from-5% to-bg-blue to-95%">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Landing/>} />
          <Route path="/about" element = {<About/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/profile/:id" element = {<Profile/>} />
          <Route path="/edit/profile" element = {<ProfileForm/>} />
          <Route path="/post/create/:creatorId" element = {<PostForm/>} />
          <Route path="/posts/:postId" element = {<Post/>} />
          <Route path="/posts/:postId/edit" element = {<PostEditForm/>} />
          <Route path="/creator/:id" element = {<Creator/>} />
          <Route path="/creator/create" element = {<CreatorForm/>} />
          <Route path="/creator/edit/:id" element = {<CreatorEditForm/>} />
          <Route path="/history/user" element = {<Transactions/>} />
          <Route path="/history/creator" element = {<TransactionsCreator/>} />
          <Route path="/*" element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
