import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {  useDispatch } from 'react-redux';

import axios from 'axios'
import Post from '../Components/Post'
const Home = () => {
const [posts,setPosts]= useState([])
const history = useHistory();
const dispatch = useDispatch();

useEffect(()=>{
    
    axios.get("https://ourlegacy.herokuapp.com/auth/auth", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        
        
        if(res.data.error){
            history.push("/login")
        }else{
            dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})
            axios.get("https://ourlegacy.herokuapp.com/posts/folow", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
                setPosts(res.data)
                console.log(res.data);
            })
        }
    })
    
}, [])

    return (
        <div  >
           

            {posts.map((post)=>  
              <div   key= {post.id}>
                    <Post  post ={post}  /> 
              </div>

            )}

          
        </div>
    )
}

export default Home
