import React from 'react';
import {useSelector} from "react-redux"
import {useParams} from 'react-router-dom'
import Classes from "./ForgotPassowrd.module.css"
import {Formik,Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const ResetPass = () => {
    let {code} =useParams();
    const email=  useSelector(state => state.email);
    let history =useHistory();

    const mailInitialVaues = {
        password: "",
    }
    const mailSchema = Yup.object().shape({
        password: Yup.string().required("You have to wite your new password")
    })
    const onSubmit = (d)=>{
        let fullData= {
            email: email,
            code:code,
            password: d.password
        }


        axios.post("https://ourlegacy.herokuapp.com/auth/reset",fullData).then((res)=>{
            if(res.data === "Wrong"){
                console.log("somthing went wrong");
            }else{
                alert("updated")
                history.push("/login")
            }

        })

        
    }
  return <div className={Classes.Container}>
  <Formik  initialValues={mailInitialVaues}  onSubmit={onSubmit} validationSchema={mailSchema}>
             
             <Form className= {Classes.Con}>  
             <ErrorMessage name='password' component="span"/>
              <Field  type = "password" className={Classes.input} name="password" placeholder= " new password" autoComplete= "off"/>
                
                 <button className={Classes.btn} type='submit'>Submit</button>
             </Form>
      
   
             </Formik> 

  </div>;
};

export default ResetPass;
