import React from 'react'
import { useFormik } from 'formik'
import {toast,Toaster} from 'react-hot-toast'
function NormalForm() {
    const initialValues={
        name:'',
        age:''
    }
    const validate=(values)=>{
        let errors={}
        if(!values.name){
            errors.name="Name is required"
        }
        if(!values.age){
            errors.age="Age is required"
        }
        return errors
    }
    const onSubmit=(values)=>{
     console.log(values)
     toast.success('Form is submitted')
    

    }
    const formik=useFormik({
      initialValues,
      validate,
      onSubmit
    })
    console.log(formik)
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <Toaster position='top-right' reverseOrder={false}></Toaster>

      <input type='text' {...formik.getFieldProps('name')}/> <br/>
      
      {formik.errors.name ? <div>{formik.errors.name}</div>:null}
      <input type='text' {...formik.getFieldProps('age')}/><br/>
      {formik.touched.age && formik.errors.age ? <div>{formik.errors.age}</div>:null}

      <button type='submit' >Submit</button>
      </form>
    </div>
  )
}

export default NormalForm
