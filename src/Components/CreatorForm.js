import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { TransactionContext } from "../Context/EthersContext";
import { GiCancel } from 'react-icons/gi'
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid';
import placeholder from "../Images/placeholder.png";
import {
  SiSubstack,
  SiDiscord,
  SiYoutube,
  SiTwitter,
} from "react-icons/si"
import {
  SlGlobe
} from "react-icons/sl";
import { FaEthereum } from "react-icons/fa";

export default function CreatorForm(){
  const { dbUser,accessToken } = useContext(TransactionContext)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [twitter, setTwitter] = useState(null)
  const [substack, setSubstack] = useState(null)
  const [discord, setDiscord] = useState(null)
  const [youtube, setYoutube] = useState(null)
  const [website, setWebsite] = useState(null)
  const [tier_1, setTier1] = useState(null)
  const [tier_2, setTier2] = useState(null)
  const [tier_3, setTier3] = useState(null)
  const [threshold, setThreshold] = useState(null)         
  const [postImage, setPostImage] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!dbUser){
      navigate("/app")
    } else if(!dbUser.creator){
      navigate(`/profile/${dbUser.id}`)
    }
  })

  // Upload file to Firebase
  function uploadPostImage(e){
    e.preventDefault();
    const imageRef = ref(storage, `creator/${postImage.name}${v4()}`)
    try{
      uploadBytes(imageRef, postImage).then((response)=>{
        getDownloadURL(imageRef).then((response)=>{
          setImageUrl(response)
          alert("uploaded")
        })
      })
    } catch (err){
      console.log(err)
    }
  }

  // Store uploaded file
  function handleFile(e){
    if(e.target.files[0]){
      setPostImage(e.target.files[0])
      console.log(e.target.files[0])
    }
  }
  
  // Remove uploaded image
  function deleteImage(e){
    e.preventDefault();
    setPostImage('');
    setImageUrl(null);
  }

  // Handle Submit
  function handleSubmit(){
    try{
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/creators/create`,{
        user_id: dbUser.id,
        bio: bio,
        name: name,
        image: imageUrl,
        twitter: twitter,
        substack: substack,
        discord: discord,
        youtube: youtube,
        website: website,
        tier_1: tier_1,
        tier_2: tier_2,
        tier_3: tier_3,
        threshold: threshold
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then((response)=>{
        console.log(response.data)
        navigate(`/creator/${response.data.id}`)
      })
    } catch(err){
      console.log(err)
    }
  }

  function handleCancel(){
    navigate(`/profile/${dbUser.id}`)
  }

  return(
    <div className="rounded-2xl bg-panel-blue/40 shadow-xl mx-32 mb-32">
      <div className="flex flex-row justify-end"> 
        <button className="h-6 w-6 mx-3 mt-3 hover:text-hover-pink transition ease-in-out duration-300" onClick={handleCancel}><GiCancel/></button>
      </div>
      <div className="flex flex-col items-center text-left px-24 py-12">
        <h1 className="font-lilita text-3xl 2xl:text-5xl xl:text-4xl">Create a Creator Page</h1>
        <p>{imageUrl === null}</p>
        <img
        className="rounded-lg w-72 h-72 object-cover"
        src={imageUrl !== null ? imageUrl : placeholder}
        alt={name ?  name : dbUser.display_name}
        />
        <div className="flex flex-row items-center justify-between w-full my-3">
          <input
            type="file"
            accept="image/*"
            onChange = {handleFile}
            className="font-raleway file:m-2 file:p-2 file:font-raleway file:text-white file:font-white file:border-0 file:bg-button-purple file:rounded-lg hover:file:bg-hover-pink file:transition file:ease-in-out file:duration-500"
           />
          {
            imageUrl === null ? 
            <button className="m-2 p-2 bg-button-purple rounded-lg hover:bg-hover-pink transition ease-in-out duration-500" onClick = {uploadPostImage} disabled={!postImage}>Upload image</button>:
            <button className="m-2 p-2 bg-button-purple rounded-lg hover:bg-hover-pink transition ease-in-out duration-500" onClick = {deleteImage}>Delete image</button>
          }
        </div>
        <div className="flex flex-col justify-start w-full">
          <h2>Wallet: {dbUser? `${dbUser.wallet.slice(0, 5)}... ${dbUser.wallet.slice(-4)}` : null}</h2>
          <input type="text" value={name} placeholder="Enter a Page Name" onChange={(e)=>{setName(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
          <input type="text" value={bio} placeholder="Write something interesting about yourself..." onChange={(e)=>{setBio(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
          <div className="w-1/2 md:w-full">
            <h2 className="font-lilita text-2xl 2xl:text-4xl xl:text-3xl my-3">Social Links</h2>
            <div className="flex flex-row items-center">
              <SlGlobe className="mr-2"/>
              <input type="text" value={website} placeholder="Website" onChange={(e)=>{setWebsite(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <div className="flex flex-row items-center">
              <SiTwitter className="mr-2"/>
              <input type="text" value={twitter} placeholder="Twitter" onChange={(e)=>{setTwitter(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <div className="flex flex-row items-center">
              <SiDiscord className="mr-2"/>
              <input type="text" value={discord} placeholder="Discord" onChange={(e)=>{setDiscord(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <div className="flex flex-row items-center">
              <SiYoutube className="mr-2"/>
              <input type="text" value={youtube} placeholder="YouTube" onChange={(e)=>{setYoutube(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <div className="flex flex-row items-center">
              <SiSubstack className="mr-2"/>
              <input type="text" value={substack} placeholder="Substack" onChange={(e)=>{setSubstack(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
          </div>
          <div className="w-1/2 md:w-full">
            <h2 className="font-lilita text-2xl 2xl:text-4xl xl:text-3xl my-3">Payment Tiers</h2>
            <div className="flex flex-row items-center">
              <FaEthereum className="mr-2"/>
              <input type="text" value={tier_1} placeholder="Tier 1" onChange={(e)=>{setTier1(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <div className="flex flex-row items-center">
              <FaEthereum className="mr-2"/>
              <input type="text" value={tier_2} placeholder="Tier 2" onChange={(e)=>{setTier2(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <div className="flex flex-row items-center">
              <FaEthereum className="mr-2"/>
              <input type="text" value={tier_3} placeholder="Tier 3" onChange={(e)=>{setTier3(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            <h2 className="font-lilita text-2xl 2xl:text-4xl xl:text-3xl my-3">Premium Content Tier</h2>
            <div className="flex flex-row items-center">
              <FaEthereum className="mr-2"/>
              <input type="text" value={threshold} placeholder="Min. Contribution" onChange={(e)=>{setThreshold(e.target.value)}} className="text-black px-2 py-1 my-1 rounded-md"/>
            </div>
            </div>
          </div>
          <button onClick={handleSubmit} className="p-2 my-2 w-1/5 self-end bg-button-purple rounded-lg hover:bg-hover-pink transition ease-in-out duration-500">Create Page</button>
      </div>
    </div>
  )
}

  