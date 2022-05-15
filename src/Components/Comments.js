import React from 'react'
import classes from './comments.module.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';

const Comments = (props) => {
    const Data=  useSelector(state => state.id);
    let history =useHistory();
    const [drop,setDrop]= useState(false)
    let valid;
    if(Data === props.comment.UserId  || props.DeleteValed){
        valid= true;
    }else{
        valid= false;
    }
    const deleteHandeler =()=> {
        
        axios.delete(`https://ourlegacy.herokuapp.com/comments/${props.comment.id}`, {headers:{
            accessToken: localStorage.getItem("accesToken")
        }}).then((res)=>{
            props.deleteHandeler(props.comment.id)
        })
    }
    const profileHandeler = ()=>{

        history.push(`/profile/${props.comment.UserId}`)
        
    }   
    const dropHandeler = ()=>{
        setDrop(!drop);
    }
    return ( 
    <div>
        <div className={classes.comment}>
            <div className={classes.header} >
                
            <div className={classes.user} onClick={profileHandeler}>

            <div className={classes.pic} >
                <h5>{props.comment.username[0]}</h5>
            </div>
            <div className={classes.username}>
                <h5>{props.comment.username}</h5>
            </div>
            </div>
            <div className={classes.drop}>
               {valid ?  <MoreHorizIcon className={classes.dottt} onClick= { dropHandeler } /> : <div/>  }

                {drop &&   

                <div className={classes.list}>

                <div className={classes.options}>
                
                {valid && 
                
                <div  onClick={deleteHandeler}>
                <DeleteIcon/> <h6>Delete</h6>
                </div>

                 }
                </div> 
                </div> 
                }
            </div>
            </div>
            <hr/>
            <div>
                   <div className={classes.body} >
                    <div className={classes.text}>
                        {props.comment.commentBody}
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    )
}

export default Comments
