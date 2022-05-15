import React from 'react'
import classes from './CreatePost.module.css'
import {Formik,Form, Field, ErrorMessage } from 'formik'
import {  useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
const CreatePost = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
    
        axios.get("https://ourlegacy.herokuapp.com/auth/auth", { headers: {accessToken: localStorage.getItem("accesToken")}}).then((res)=>{
            
            
            if(res.data.error){
                
            }else{
                dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})
                
            }
        })
        
    }, [])

    let history =useHistory();
    const initialValues =  {
        title: "",
        postText: "",
    }

    const validationSchema= Yup.object().shape({
        title: Yup.string().required("You have to write a title"),
        postText: Yup.string().required("You have to write a summary") ,
    })

const onSubmit =(data)=>{

    axios.post("https://ourlegacy.herokuapp.com/posts",data, {
        headers: {
            accessToken: localStorage.getItem("accesToken")
        }
    }).then((res)=>{
        if(res.err){
            alert("something went wrong")
        }else{
            history.push("/")
        }
    })
}

    return (
        <div className={classes.container}>
           <Formik  initialValues={initialValues}  onSubmit={onSubmit} validationSchema={validationSchema}>
             
               <Form className= {classes.formCon}>
                    <label>Title:</label>
                
                   <Field className={classes.title} name="title" placeholder= "EX. a name of book..." autoComplete= "off"/>
                   <ErrorMessage name='title' component="span"/>
                   <label>Summary: </label>
                   <ErrorMessage name='postText' component="span"/>
                   <Field as= "textarea" type="text" className={classes.paragraph} name="postText" placeholder= "EX. What I learnd was..." autoComplete= "off"/>
                   <Button  type='submit' variant="primary">Create post</Button>
                   
               </Form>
               
            
            </Formik> 
           
          
        </div>
    )
}

export default CreatePost
