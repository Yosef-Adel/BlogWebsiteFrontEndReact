import React from 'react'
import classes from './Post.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Post = (props) => {
    let history = useHistory();
    const Data=  useSelector(state => state);
    const [liked,setLiked] = useState(false);
    useEffect(()=>{
        if(Data.login ===false){
        }else{
            const array = props.post.Likes;
            const selected = array.find((v) =>{
                return  v.UserId === Data.id  && v.PostId === props.post.id
            })

            if(selected){
                setLiked(true);
            }else{
                setLiked(false);
            }
            
        }
    },[])
    const counter = props.post.Likes;
    const [count, setCount] = useState(counter.length)
    const likeHandeler = ()=>{
       //console.log(id);
        axios.post("https://ourlegacy.herokuapp.com/likes",{ postId: props.post.id} ,
        {
            headers: {accessToken: localStorage.getItem("accesToken")}
        
        }).then((res)=>{
            if(res.data==="Liked"){
                setCount(count+1)
                setLiked(true);
            }else{
                setCount(count-1)
                setLiked(false);
            }
        });
        
    }
    const detailsHandeller = ()=>{
        history.push(`/post/${props.post.id}`)
    }
const profileHandeler = ()=>{
    if(props.prof){
        return;
    }
    history.push(`profile/${props.post.UserId}`)
}   

    return (
        <div className={classes.Post}>


            <div>
                <div className={classes.header} onClick={profileHandeler}>
                    <div className={classes.pic}>
                        <h5>{props.post.username[0]}</h5>
                    </div>
                    <div className={classes.username}>
                        <h5>{props.post.username}</h5>
                    </div>
                </div>
                
                <hr/>
                <div className={classes.body} onClick={detailsHandeller}>
                    <div className={classes.title}>
                    <h6>{props.post.title}</h6>
                    </div>
                    <div className={classes.text}>
                        {
                             props.post.postText.length > 100 ? `${props.post.postText.slice(0,100)}... See More ` : `${props.post.postText}`
                        }
                    </div>
                </div>
                <div className={classes.footer}>
                { Data.login &&<div>
                        {liked&& <FavoriteIcon onClick={likeHandeler }></FavoriteIcon>}
                        {!liked && <FavoriteBorderIcon onClick={likeHandeler }></FavoriteBorderIcon>  }
                        {count}
                        </div>}

                        { ! Data.login &&<div>
                        {!liked && <FavoriteBorderIcon ></FavoriteBorderIcon>  }
                        {count}
                        </div>}
                </div>
            </div>
  
        </div>
    )
}
export default Post
