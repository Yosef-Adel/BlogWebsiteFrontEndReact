import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import User from '../Components/User';
import {  useDispatch } from 'react-redux';
const AddFrind = () => {
    const [userList, setUserList]= useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{

        axios.get("https://ourlegacy.herokuapp.com/auth/auth", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        
        
            if(res.data.error){
               
            }else{
                dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})
                
            }
        })
        axios.get("https://ourlegacy.herokuapp.com/auth/all", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
            setUserList(res.data)
            console.log(res.data);
        })
    },[])



  return (
      <div >
         {userList.map((u) => 
             <div key={u.id} >
                <User user= {u}/>
             </div>
         )}
      </div>
  );
};

export default AddFrind;
