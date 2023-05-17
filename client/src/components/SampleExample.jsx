import React from 'react'

function SampleExample(props,{sample}) {
    const {id,name}=props;
  return (
    <div>
     <h1 style={{color:'red'}}>

    {name}

     </h1>
     <h1 style={{color:'red'}}>
 {sample}

 </h1>
    </div>
  )
}

export default SampleExample
