

const mongoose=require('mongoose')

const userEmailAuthSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    expiresIn:{
        type:Date
    },
    isVerified:{
        type:Boolean
    }
})

module.exports=mongoose.model('UserEmail',userEmailAuthSchema)