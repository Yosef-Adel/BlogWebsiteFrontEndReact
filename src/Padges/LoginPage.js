import React from 'react';
import Classes from "../Components/Form.module.css"
import Login from '../Components/Login';
import { useState } from 'react';
import Signup from '../Components/Signup';
const LoginPage = () => {
    const [haveAcount,setHaveAcount]=useState(true);
    const signinHandeler= ()=>{
        setHaveAcount(true)
    }
    const signupHandeler = ()=>{
        setHaveAcount(false)
    }
  return (
  <div className= {Classes.container}>
     {haveAcount&&<Login signupHandeler={signupHandeler}/>}
    {!haveAcount&&<Signup signinHandeler={signinHandeler}/>}
  </div>
  
  );
};

export default LoginPage;
