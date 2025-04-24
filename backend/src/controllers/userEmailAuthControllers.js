const otpGenerator=require('otp-generator');
const UserEmail = require('../models/UserEmail');
const sendMail = require('../utils/nodemailer');
const User = require('../models/User');

const sendOtp=async(req,res)=> {
    try {
        const {email}=req.body;
        if(!email)
            return res.status(404).json({msg:"Please enter your email"})

        const userEmail=await UserEmail.findOne({email})
        const user=await User.findOne({email})

        if(userEmail && user) 
            return res.status(401).json({msg:'Email is already in use'})
        
        const otp=await otpGenerator.generate(6,{specialChars:false,lowerCaseAlphabets:false})
        
        const expiresIn=new Date + 5*60*1000

        const newUserEmail=await UserEmail.findOneAndUpdate({email},{$set:{
            otp,
            expiresIn,
        }},{upsert:true})
        
        await sendMail(email,otp)

        return res.status(200).json({msg:'OTP sended successfully!'})
        
    } catch (err) {
        console.log('Error occured at send otp ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const verifyOtp=async(req,res)=>{
    try {
        const {email,otp}=req.body;
        if(!email || !otp)
            return res.status(404).json({msg:'Please enter a valid otp and email'})
        const userEmail=await UserEmail.findOne({email})
        if(!userEmail || userEmail.otp!==otp || userEmail.expiresIn > new Date)
            return res.status(403).json({msg:'OTP is invalid or expired'})

        userEmail.otp=''
        userEmail.expiresIn=''
        userEmail.isVerified=true
        await userEmail.save()
        return res.status(200).json({msg:'OTP verified successfully!'})
    } catch (err) {
        console.log('Error occured at verify otp ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={sendOtp,verifyOtp}