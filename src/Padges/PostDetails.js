import React from 'react'
import {useParams} from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect ,useState } from 'react';
import axios from 'axios';
import classes from "./postDetails.module.css"
import Comments from '../Components/Comments';
import * as Yup from 'yup'
import {useSelector} from "react-redux"
import {Formik,Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportOffOutlinedIcon from '@mui/icons-material/ReportOffOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {  useDispatch } from 'react-redux';
const PostDetails = () => {
    const [firstleter, setFirstletter] = useState('');
    let history =useHistory();
    const [liked,setLiked] = useState(false);
    const Data=  useSelector(state => state);
    let {id} =useParams();
    const [post,setPost]= useState([]);
    const [comments, setComments] = useState([]);
    const [counter, setCounter] = useState(0) ;
    const [report,setReport] = useState(false);
    const [edit,setEdit] = useState(false);
    const [drop,setDrop]= useState(false)
    const dispatch = useDispatch();
    const gitComments = ()=>{
        axios.get(`https://ourlegacy.herokuapp.com/comments/${id}`).then((res)=>{
            setComments(res.data)
            
        })
       
    }
    const likeHandeler = ()=>{
     
         axios.post("https://ourlegacy.herokuapp.com/likes",{ postId: post.id} ,
         {
             headers: {accessToken: localStorage.getItem("accesToken")}
         
         }).then((res)=>{
             if(res.data === "Liked"){
                 setCounter(counter+1)
                 setLiked(true);
             }else{
                 setCounter(counter-1)
                 setLiked(false);
             }
         });
         
     }

const getData = ()=>{
    axios.get(`https://ourlegacy.herokuapp.com/posts/byId/${id}`).then((res)=>{
        setPost(res.data)
        setCounter(res.data.Likes.length)
        setFirstletter(res.data.username[0]);
        if(Data.login ===false)
        {
        }else{
            const array = res.data.Likes;
            const selected = array.find((v) =>{
                return  v.UserId === Data.id  && v.PostId === res.data.id
            })

            if(selected){
                setLiked(true);
            }else{
                setLiked(false);
            }
        }

    })
}

   

    useEffect (()=>{

        axios.get("https://ourlegacy.herokuapp.com/auth/auth", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
        
        
            if(res.data.error){
               
            }else{
                dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})
                
            }
        })

        getData()
        setComments([])
        gitComments();
    },[])

    const onSubmit = (data) => {
        let comment=data.commentBody;
        data.commentBody=""
        axios
          .post("https://ourlegacy.herokuapp.com/comments", {
            commentBody: comment,
            PostId: id,
          },
          {
              headers: {
                accessToken: localStorage.getItem("accesToken")
              }
          }
          )
          .then((response) => {
              if(response.data.error){
              }else{
               
                gitComments();
      
              }
           
          });
      };



      
      const initialValues =  {
        commentBody: "",
    }
    const initialValues2 =  {
        Resone: "",
    }

    const validationSchema= Yup.object().shape({
        commentBody: Yup.string().required("You must write a Comment"),
        
    })
    const validationSchema2= Yup.object().shape({
        Resone: Yup.string().required("You have to write a Reason"),
        
    })
    const deleteHandeler = (id)=>{
        gitComments();
    };
    const deletPosthandeler = () =>{
        console.log(post.id);

        axios.delete(`https://ourlegacy.herokuapp.com/posts/${post.id}`, {
            headers: {accessToken: localStorage.getItem("accesToken")}
        }).then((res)=>{
            
        })
        history.push("/")
        
    }
    const profileHandeler = ()=>{

        history.push(`/profile/${post.UserId}`)
        
    }   
    const reportHandeler = ()=>{
        setReport(!report);
    }
    const onSubmit2 = (data) => {
        let resone=data.Resone;
        data.Resone=""
        axios
        .post("https://ourlegacy.herokuapp.com/repoet", {
            Resone: resone,
            PostId: id,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accesToken")
            }
        }
        )
        .then((response) => {
            if(response.data.error){
            }else{
                setReport(false)
            }
        
        });

    };

    const initialValuesF =  {
        title: post.title,
        postText: post.postText,
        postId: post.id
    }
    const onSubmitF =(data)=>{
        console.log(data);

        axios.post("https://ourlegacy.herokuapp.com/posts/edit",data, {
            headers: {
                accessToken: localStorage.getItem("accesToken")
            }
        }).then((res)=>{
            getData()
            setEdit(false)
        })
    }

    const validationSchemaF= Yup.object().shape({
        title: Yup.string().required("You must write a Name"),
        postText: Yup.string().required("You must write why do you hate him or her") ,
    })

    const editHandeler = ()=>{
            setEdit(!edit)
    }
    const dropHandeler = ()=>{
        setDrop(!drop);
    }
    return (
        <div>

            {
                report && 
                <div>
                    <div className= {classes.pop} onClick={reportHandeler}>
                    </div>
                    <div className= {classes.opt} >
                    <Formik  initialValues={initialValues2}  onSubmit={onSubmit2} validationSchema={validationSchema2}>
             
                    <Form className= {classes.formCon}>  
                    <ErrorMessage name='Resone' component="span"/>
                        <Field  as= "textarea" className={classes.input2} name="Resone"  placeholder= "Write a Reason" autoComplete= "off"/>
                        
                        <Button  type='submit' variant="outline-danger">Submit</Button>
                    </Form>
             
          
                    </Formik> 
                    </div>    
                </div>
            }


            {
                edit && 
                <div>
                     <div className= {classes.pop} onClick={editHandeler}>
                    </div>
                    <div className= {classes.opt} >
                <Formik  initialValues={initialValuesF}  onSubmit={onSubmitF} validationSchema={validationSchemaF}>
             
               <Form className= {classes.formCon}>
                    <label>Title:</label>
                
                   <Field className={classes.title} name="title"autoComplete= "off"/>
                   <ErrorMessage name='title' component="span"/>
                   <label>Summary: </label>
                   <ErrorMessage name='postText' component="span"/>
                   <Field as= "textarea" type="text" className={classes.paragraph} name="postText"  autoComplete= "off"/>
                   <Button  type='submit' variant="primary">Edit post</Button>
                   
               </Form>
               
            
            </Formik> 
                    </div>

                </div>
            }
        
        <div className={classes.container}>
           
          
          <div className={classes.Post}>
          <div>
                <div className={classes.header} >

                   <div className={classes.user} onClick={profileHandeler}>

                   <div className={classes.pic} >
                        <h5>{firstleter}</h5>
                    </div>
                    <div className={classes.username}>
                        <h5>{post.username}</h5>
                    </div>
                   </div>

                    <div className={classes.drop}>

                        <MoreHorizIcon className={classes.dottt} onClick= { dropHandeler } />

                        {drop &&   
                        
                        <div className={classes.list}>

                                    <div className={classes.options}>
                                    {post.UserId === Data.id ?  <div >
                                        <div  onClick={editHandeler}  >
                                        <EditIcon/> 
                                        <h6>Edit</h6>
                                        </div>
                                        <div  onClick={deletPosthandeler}>
                                        <DeleteIcon/> <h6>Delete</h6>
                                        </div>
                                    </div> 
                                    : Data.login && 
                                    <div onClick={reportHandeler}>
                                        <ReportOffOutlinedIcon /> <h6>Report</h6>
                                        
                                    </div>}  

                                    </div> 
                                    </div> 
                                    
                        }
                     
                    </div>

                </div>
                <hr/>
                <div className={classes.body} >
                    <div className={classes.title}>
                    <h6>{post.title}</h6>
                    </div>
                    <div className={classes.text}>
                        {post.postText}
                    </div>
                </div>
            </div>
           
          
            <div className={classes.footer}>      
                { Data.login &&<div >
                        {liked=== true && <FavoriteIcon onClick={likeHandeler }></FavoriteIcon>}
                        {liked === false && <FavoriteBorderIcon onClick={likeHandeler }></FavoriteBorderIcon>  }
                        {counter}
                        </div>}

                        { Data.login === false &&<div>
                        {liked === false && <FavoriteBorderIcon ></FavoriteBorderIcon>  }
                        {counter}
                        </div>}
                
                </div>

          </div>

        <div className={classes.comments}>
            <div className= {classes.title2} >
            <h2 className= {classes.name}> Comments</h2>
            </div>
            
            {
                Data.login && 
                <Formik  initialValues={initialValues}  onSubmit={onSubmit} validationSchema={validationSchema}>
             
               <Form className= {classes.formCon}>  
                   
                   <Field  as= "textarea" className={classes.input} name="commentBody"  placeholder= "Write a comment" autoComplete= "off"/>
                   
                   <Button  type='submit' variant="outline-primary">Create Comment</Button>
               </Form>
               
            
            </Formik> 
            }
            

            { 
                comments.map((comment) =>
                    <Comments  key={Math.random()} comment={comment} DeleteValed = {post.UserId === Data.id} deleteHandeler= {deleteHandeler}/>
                )
            }
        </div>
        </div>
        </div>
    )
}

export default PostDetails
