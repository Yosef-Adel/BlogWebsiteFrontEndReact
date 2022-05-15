import React from 'react';
import Classes from "./Form.module.css"
import {Formik,Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react';

const Signup = (props) => {
    const [error1, setError1]= useState(false);
    const [verfiy,setVerefiy] = useState(false)
    const [data,setData]= useState({})
    const [error,setError]= useState("")
    const initialValues = {
        username: "",
        password : "",
        email: ""
    }
    const verefiyInitialVaues = {
        code: "",
    }
    const verefiySchema = Yup.object().shape({
        code: Yup.string().required("You have to wite OTP")
    })
    const validationSchema= Yup.object().shape({
        password: Yup.string().required("Write Your Password") ,
        username: Yup.string().min(3).required("Write Your Username."),
        email: Yup.string().min(3).required("Write Your email.")
    })
    const onSubmit =(data)=>{
        setData(data);
        axios.post("https://ourlegacy.herokuapp.com/verefiy", data).then((res)=>{
            if(res.data === "Email already exist"){
                setError1("Email already exist")
            }
            else if(res.data === "Mail Sent"){
                setVerefiy(true);
            }else{
             console.log("error");
            }
        })
       
    }
    const verefiyHandeler = () => {
        setVerefiy(!verfiy);
    }
    const onSubmit2 = (data2)=>{
    const code  = data2.code;
    const fullData = data;
    fullData.code = code;
   console.log(fullData)
  
    axios.post("https://ourlegacy.herokuapp.com/auth", fullData).then((res)=>{
        if(res.data === "Wrong" ){
            setError("Wrong OTP")
        }else{
            props.signinHandeler();
        }
    })
}
    return (
        <div>
{
                verfiy && 
                <div>
                    <div className= {Classes.pop} onClick={verefiyHandeler}>
                    </div>
                    <div className= {Classes.opt} >
                    <Formik  initialValues={verefiyInitialVaues}  onSubmit={onSubmit2} validationSchema={verefiySchema}>
             
                    <Form className= {Classes.formCon}>  
                    <ErrorMessage name='code' component="span"/>
                    {error === false ? <span></span> :  <span>{error}</span>}
                        <label>Write your OTP that sent to your mail</label>
                        <Field  className={Classes.input2} name="code"  placeholder= "_ _ _ _" autoComplete= "off"/>
                       
                        <button className={Classes.btn} type='submit'>Submit</button>
                    </Form>
             
          
                    </Formik> 
                    </div>    
                </div>
            }
       
        <div className={Classes.form}>



            <Formik initialValues={initialValues}  validationSchema={validationSchema} onSubmit={onSubmit}>
              <Form className={Classes.loginform}>
              <ErrorMessage name='username' component="span"/>
              
              <Field className={Classes.userinput} name="username" placeholder= "username" autoComplete= "off"/>
              <ErrorMessage name='email' component="span"/>
              {error1 === false ? <span></span> :  <span>{error1}</span>}
              <Field  type = "email" className={Classes.userinput} name="email" placeholder= "email" autoComplete= "off"/>
              <ErrorMessage name='password' component="span"/>
              <Field  type = "password" className={Classes.userinput} name="password" placeholder= "password" autoComplete= "off"/>
           
              <button className={Classes.btn} type='submit'>SIGN UP</button>
              <div className={Classes.options02}>
                  <p>Already Registered? <a onClick = {props.signinHandeler} >Sign In</a></p>
              </div>
              </Form>
             
            </Formik>
      
      
      
        </div>
        </div>
    );
};

export default Signup;
