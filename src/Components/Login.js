import React from 'react';
import Classes from "./Form.module.css"
import {Formik,Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import { useState } from 'react';
import {Link} from 'react-router-dom'

const Login = (props) => {
    const dispatch = useDispatch();
    const [error2, setError2]= useState(false);
    const [error1, setError1]= useState(false);
    const initialValues = {
        email: "",
        password : ""
    }
    const history = useHistory();

    const validationSchema= Yup.object().shape({
        password: Yup.string().required("Write Your Password") ,
        email: Yup.string().min(3).required("Write Your email.")
    })
    const onSubmit =(data)=>{

        axios.post("https://ourlegacy.herokuapp.com/auth/login", data).then((res)=>{
            if(res.data.error){
                if(res.data.error === "email doesn't exist" ){
                    setError1(res.data.error)
                }else{
                    setError1(false)
                    setError2("Wrong userName OR Password");
                }
                
            }else{
                localStorage.setItem("accesToken" , res.data.token);
                dispatch({type:"Login", login:true, username: res.data.username  ,id:  res.data.id})
                history.push("/");
            }
        })
    }
    
  return (
  <div className={Classes.form}>
      <Formik initialValues={initialValues}  validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={Classes.loginform}>
        <ErrorMessage name='email' component="span"/>
        {error1 === false ? <span></span> :  <span>{error1}</span>}
        <Field className={Classes.userinput} name="email" placeholder= "email" autoComplete= "off"/>
      
        <ErrorMessage name='password' component="span"/>
        {error2 === false  ? <span></span> :  <span>{error2}</span>}
        <Field type = "password" className={Classes.userinput} name="password" placeholder= "password" autoComplete= "off"/>
       

       
        <button className={Classes.btn} type='submit'>Login</button>
        <div className={Classes.options02}>
			<p>Not Registered? <a onClick={props.signupHandeler}>Create an Account</a></p>
            <Link to= "/forgotpassowrd"> frogot passowrd?</Link>
		</div>
        </Form>
       
      </Formik>



  </div>
  
  );
};

export default Login;
