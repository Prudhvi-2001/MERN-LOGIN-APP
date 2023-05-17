import React, { useState } from 'react'
import './form.css'
import {Formik, useFormik,Form, Field, ErrorMessage} from 'formik'
import { Toaster,toast } from 'react-hot-toast'
import {loginValidate} from './validate'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Profile from './Profile'
import { fetchData } from './reducer/profileActions'
export const validations={
  authenticated:false,
  user:""
}
function Login() {
  //declare the action
  const[user,setUser]=useState('')
  const navigate=useNavigate();
    const initialValues={
        username:'',
        email:''
}
const onSubmit=async(values,onSubmitProps)=>{
  let result=await fetch("http://localhost:8080/login",{
    method:"POST",
    headers:{
        "content-type":"application/json",
        Accept:"application/json",
       "Access-Control-Allow-Origin":"*",
    },
    body:JSON.stringify(values)

  })
  console.log(onSubmitProps)
  console.log(result.json())
  console.log(result.type)
  if(result.status === 200) {
    toast.success('Login Sucessful')
    validations.authenticated=true
    validations.user=values.username
    navigate('/profile')
    
    
  }  else{
    toast.error('Error in login')
  }
}


const validateOnBlur=false
const validateOnChange=false
const validateOnmount=false

 return (

<Formik
initialValues={initialValues}
validateOnBlur={validateOnBlur}
validateOnChange={validateOnChange}
validateOnMount={validateOnmount}
validate={loginValidate}
onSubmit={onSubmit} 
>
{(formik)=>{
 console.log(formik)
     return(
       <Form>
 <Toaster position='top-right' reverseOrder={false}></Toaster>
 <div class="form1">
 <div class="title">Welcome</div>
 <div class="subtitle">Let's login your account!</div>
 <div class="input-container ic1">
   <Field id="firstname" class="input" type="text" placeholder=" " name='username'/>
   <div class="cut"></div>
   <label for="firstname" class="placeholder">Username</label>
 </div>

 <div class="input-container ic2">
   <Field  id="email" class="input" type="text" placeholder=" "name='email'></Field>
   <div class="cut cut-short"></div>
   <label for="email" class="placeholder">Email</label>
 </div>


 <input type='submit'className='submit' value={formik.isSubmitting ? "Please Wait":"Submit"}  />
 <div class="subtitle">Don't have an account?<Link to='/' className='link'>Sign Up</Link></div>
</div>
 </Form>
     )
   }}
   
</Formik>
)
}

export default Login
