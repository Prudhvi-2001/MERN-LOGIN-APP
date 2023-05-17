const mongoose=require('mongoose')
const Schema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    username:String,
    createdAt:Date
})
module.exports=mongoose.model('schema',Schema)