import React, { useState } from 'react'

function UseState() {
  const style={
    padding:'5px',
    border:'1px solid #ccc',
    margin:'5px',
    outline:'none',
    fontSize:'12px',
    fontFamily:'sans-serif'


  }
  const [submitted,setSubmitted]=useState(false)
    const [data,setData]=useState({
        name:"",
        emailId:"",
        password:"",
    })
  
    const onSubmitHandler=(e)=>{
         e.preventDefault();
        console.log(data.name)
        console.log(e)
    }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
        style={style} 
        type='text'
        name='name'
        value={data.name}
        onChange={(e)=>setData({...data,name:e.target.value})}
       
        />
        
      
        <br/>
        <input
        style={style} 
        type='text'
        name='emailId'
        value={data.emailId}
        onChange={(e)=>setData({...data,emailId:e.target.value})}
        />
        <br/>
        <input 
        style={style} 
        type='password'
        value={data.password}
        name='password'
        onChange={(e)=>setData({...data,password:e.target.value})}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UseState
//sample message
