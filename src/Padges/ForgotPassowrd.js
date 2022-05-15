import React from 'react';
import {Formik,Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Classes from "./ForgotPassowrd.module.css"
import axios from 'axios'
import { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

const ForgotPassowrd = () => {
    const [error , setError]= useState("")
    const [otperror , setOtpError]= useState("")
    const [email,setEmail] = useState("")
    const dispatch = useDispatch();
    let history =useHistory();
    const [verfiy,setVerefiy] = useState(false)

    const verefiyInitialVaues = {
        code: "",
    }
    const verefiySchema = Yup.object().shape({
        code: Yup.string().required("You have to wite OTP")
    })
    const mailInitialVaues = {
        email: "",
    }
    const mailSchema = Yup.object().shape({
        email: Yup.string().required("You have to wite your mail")
    })

const onSubmit = (data)=>{
    setEmail(data.email)
    axios.post("https://ourlegacy.herokuapp.com/verefiy/check",data).then((res)=>{
        if(res.data ==="Email doesn't exist" ){
            setError("Email doesn't exist")
        }else{
            
            setVerefiy(true);
        }
    })
}
const onSubmit2 = (d)=>{
let Data = d;
Data.email = email;

axios.put("https://ourlegacy.herokuapp.com/verefiy/check",{code: d.code,email :email}).then((res)=>{
if(res.data === "Wrong"){
    setOtpError("Wrong OTP")
}else{
    dispatch({type: "check" , email: email});
    history.push(`/reset/${d.code}`)
}

})

}

const verefiyHandeler = () => {
    setVerefiy(!verfiy);
}
  return ( 
  <div className={Classes.Container}>

{
                verfiy && 
                <div>
                    <div className= {Classes.pop} onClick={verefiyHandeler}>
                    </div>
                    <div className= {Classes.opt} >
                    <Formik  initialValues={verefiyInitialVaues}  onSubmit={onSubmit2} validationSchema={verefiySchema}>
             
                    <Form className= {Classes.formCon}>  
                    <ErrorMessage name='code' component="span"/>
                    {otperror === false ? <span></span> :  <span>{otperror}</span>}
                        <label>Write your OTP that sent to your mail</label>
                        <Field  className={Classes.input2} name="code"  placeholder= "_ _ _ _" autoComplete= "off"/>
                       
                        <button className={Classes.btn} type='submit'>Submit</button>
                    </Form>
             
          
                    </Formik> 
                    </div>    
                </div>
            }

            <Formik  initialValues={mailInitialVaues}  onSubmit={onSubmit} validationSchema={mailSchema}>
             
             <Form className= {Classes.Con}>  
             <ErrorMessage name='email' component="span"/>
              {error === false ? <span></span> :  <span>{error}</span>}
              <Field  type = "email" className={Classes.input} name="email" placeholder= "email" autoComplete= "off"/>
                
                 <button className={Classes.btn} type='submit'>Submit</button>
             </Form>
      
   
             </Formik> 

  </div>
  );
};

export default ForgotPassowrd;
