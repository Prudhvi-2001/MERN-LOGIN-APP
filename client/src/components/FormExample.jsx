import React from 'react'
import './form.css'
import {Formik, useFormik,Form, Field, ErrorMessage} from 'formik'
import { Toaster,toast } from 'react-hot-toast'
import { registerValidate} from './validate'
import { Link } from 'react-router-dom'
function FormExample() {
    const initialValues={
             fname:'',
             lname:'',
             email:'',
             username:''
    }
    const onSubmit=async(values,onSubmitProps)=>{
 
       let result=await fetch('http://localhost:8080/signup',{
        method:"POST",
        headers:{
          "content-type":"application/json",
          Accept:"application/json",
         "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify(values)
       })
      result= await result.json()
      console.log(result)

      console.log(onSubmitProps)
      console.log(values)
      toast.success("Form submitted sucessfully")
      onSubmitProps.resetForm()
        
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
    validate={registerValidate}
    onSubmit={onSubmit} 
    >
    {(formik)=>{
      console.log(formik)
          return(
            <Form>
      <Toaster position='top-right' reverseOrder={false}></Toaster>
      <div class="form1">
      <div class="title">Welcome</div>
      <div class="subtitle">Let's create your account!</div>
      <div class="input-container ic1">
        <Field id="firstname" class="input" type="text" placeholder=" " name='fname'/>
        <div class="cut"></div>
        <label for="firstname" class="placeholder">First name</label>
      </div>
      
      <div class="input-container ic2">
        <Field  id="lastname" class="input" type="text" placeholder=" " name='lname'  />
        <div class="cut"></div>
        <label for="lastname" class="placeholder">Last name</label>
      </div>
      <div class="input-container ic2">
        <Field  id="email" class="input" type="text" placeholder=" "name='email'></Field>
        <div class="cut cut-short"></div>
        <label for="email" class="placeholder">Email</label>
      </div>
      <div class="input-container ic2">
        <Field  id="email" class="input" type="text" placeholder=" "name='username'></Field>
        <div class="cut cut-short"></div>
        <label for="email" class="placeholder">Username</label>
        <span className='note'>Note username must contains numbers and characters</span>
      </div>


      <input type='submit'className='submit' value='Submit'  />
      <div class="subtitle">Already have an account?<Link to='login' className='link'>Login</Link></div>
    </div>
      </Form>
          )
        }}
    </Formik>
  )
}

export default FormExample
