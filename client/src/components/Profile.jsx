import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from './reducer/profileActions'
import { validations } from './Login';
import './form.css';

const Profile =({ data, loading, error, fetchData,username})=>{
  useEffect(()=>{
    fetchData(username)
  },[])
  if(validations.authenticated){
    return (
      <div class="card">
        <h1 class="title" >{data.fname}</h1>
        <p class="title">{data.lname}</p>
        <p class="title"> {data.email}</p>
        <p><button>Contact</button></p>
      </div>
    );
  }
 return (
  <div style={{color:"red"}}>
    <p>Please login to see your profile</p>
  </div>
 )
  
};

const mapStateToProps = (state) => ({
  data: state.data,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch,username=validations.user) => {
    return {
      fetchData: () => dispatch(fetchData(username)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
