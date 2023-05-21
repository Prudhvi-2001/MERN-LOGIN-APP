const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyparser=require('body-parser')
const morgan=require('morgan')
const User=require('./UserModel.js')
const jwt=require('jsonwebtoken')
const ENV=require('./config.js')
const app=express() 
const port=8080
//Example to pull the repository from remote to local
//middlewares
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors())
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

//database connection
const username12='prudhvi12'
const password=2001
const URL = `mongodb+srv://${username12}:${password}@cluster0.jpx7fhh.mongodb.net/?retryWrites=true&w=majority
`;
mongoose.connect(
 URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(()=>{
    console.log("Database is connected")
  }).catch(error=>console.log(error))

app.get('/',(req,res)=>{
    res.send('HOME PAGE')
})
//To store the data in the database
app.post('/signup',async(req,res)=>{
    const {fname,lname,email,username}=req.body
    try{
        const newUser=new User({
          fname,
          lname,
          email,
          username
        })

        await newUser.save()
        .then(result=>{
        res.status(200).send({result})
        }).catch(error=>{
         res.status(404).send(
        {
            msg:"Error while registration"
        }
         )
        })


    }catch(error){
        res.status(404).send({error})
    }

})
async function validUser(req,res,next){
    const { username } = req.body;
    User.findOne({username})
    .then(user=>{
        if(!user) return res.status(404).send({msg:"Username is not found"})
        // return res.status(200).send({msg:"Username is found"})
        next();
    })
    .catch(error=>{
        return res.status(404).send(error)
    })
    
}
//Login route
app.post('/login',validUser,(req,res)=>{
  const {email}=req.body


  try{
    
   User.findOne({email})
   .then(email=>{
    if(!email) return res.status(404).send({msg:"Email is not registered"})
    
    const token=jwt.sign({
        userId:email._id,
        username:email.username,


    },ENV.JWT_SECRET,{expiresIn:'1h'})
     
    return res.status(200).send({
        msg:"Login successful",
        username:email.username,
        token
    })
   })



  }catch(error){
    res.status(400).send(error)
  }

})
async function authupdateuser(req,res,next){
try{

const token=req.headers.authorization.split(" ")[1];
const decodeToken=await jwt.verify(token,ENV.JWT_SECRET)
req.user=decodeToken

next();


}catch(error){
    res.status(401).send({msg:"Authorization failed"})
}
} 
//https://localhost:8080/updateuser
app.put('/updateuser',authupdateuser,(req,res)=>{
    try{
     const {userId}=req.user;
     if(userId){
       const newbody=req.body
       User.updateOne({_id:userId},newbody)
       .then(result=>{
        res.status(200).send({msg:"Updated sucessfully"})
       }).catch(err=>{
        res.status(404).send({msg:"Error in Updation"})
       })
     }
     else{
       res.status(404).send({msg:"Invalid ID"}) 


     }


    }catch(error){}
})
//https://localhost:8080/getdetails/username
app.get('/getdetails/:username',(req,res)=>{
    const {username}=req.params
    try{
      User.findOne({username})
      .then(user=>{
        res.status(200).send(user)
      }).catch(error=>{
        res.status(400).send({msg:"Not able to find Id"})
      })
    console.log(req.originalUrl)
    }catch(error){
        
        res.status(404).send(error)
    }

})
//to get all the blogs frm the database
//https://localhost:8080/users
app.get('/users',(req,res)=>{
  User.find()
  .then(result=>{
    res.status(200).json({res:result})
  }).catch(error=>{
    res.status.send({error})
  })
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
