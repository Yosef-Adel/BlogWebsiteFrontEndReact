import React from 'react';
import {useParams} from 'react-router-dom'
import { useEffect ,useState } from 'react';
import axios from 'axios';
import classes from "./profile.module.css"
import Post from '../Components/Post';
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import {  useDispatch } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const [follow,setFollow]= useState();
    const [user, setUser] =useState([])
    const [firstletter, setFirstLetter] = useState("");
    const [posts,setposts]= useState([]);
    const Data=  useSelector(state => state);


    useEffect(()=>{
        axios.get("https://ourlegacy.herokuapp.com/auth/auth", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        
        
        if(res.data.error){
           
        }else{
            dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})
            
        }
    })
        axios.get(`https://ourlegacy.herokuapp.com/auth/profile/${id}`).then((res)=>{
            setUser(res.data)
            setFirstLetter(res.data.username[0])
        })
        axios.get(`https://ourlegacy.herokuapp.com/posts/byUserId/ ${id}`).then((res)=>{
            setposts(res.data)

        })

        axios.get(`https://ourlegacy.herokuapp.com/follow/ ${id}`,{ headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        console.log(res.data);
        if(res.data === "false" ){
            setFollow("Follow")
        }else{
            setFollow("Following")
        }
    })


    },[id]);


const editHandeler = ()=>{

}
const followHandeler = ()=>{
    axios.post("https://ourlegacy.herokuapp.com/follow", {follwer: id}, { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        console.log(res.data);
        if(res.data === "unFollowed"){
            setFollow("Follow")
        }else{
            setFollow("Following")
        }
    })
}

  return (
  <div className= {classes.profile}>
      <div className= {classes.UserPic}>

           <h1>{firstletter}</h1>
      </div>

        <h1>{user.username}</h1>
        
        {Data.id != id && 
        <Button onClick={followHandeler} variant="primary">{follow}</Button>

        }
        
        
        
        {posts.map((post)=>  
              <div   key= {post.id}>
                    <Post  post ={post} prof= "true"  /> 
              </div>

        )}

  </div>
  );
};

export default Profile;



