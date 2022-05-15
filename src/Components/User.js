import React from 'react';
import classes from "./User.module.css"
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

const User = ({user}) => {
    const [folow, setFollow]= useState("Follow")
    const history = useHistory();

    const followHandeler = ()=>{
        axios.post("https://ourlegacy.herokuapp.com/follow", {follwer: user.id}, { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
            console.log(res);

            if(res.data === "unFollowed"){
                setFollow("Follow")
            }else{
                setFollow("Following")
            }
            
        })
    }
    const profileHandeler = ()=>{
       
        history.push(`profile/${user.id}`)
    }   
    

  return (
      <div className={classes.container}>
          <div className={classes.user}>
                <div onClick={profileHandeler} className= {classes.info}>
                    <div className= {classes.pic}>
                        <h4>{user.username[0]}</h4>
                    </div>
                    <div>
                        <h4>{user.username}</h4>
                    </div>
                </div>
                <div className={classes.opt}>
                <Button onClick={followHandeler} variant="primary">{folow}</Button>
                </div>
          </div>

      </div>
  );
};

export default User;
