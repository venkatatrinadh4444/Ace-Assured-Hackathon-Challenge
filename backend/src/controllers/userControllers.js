const UserEmail=require('../models/UserEmail')
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=> {
    try {
        const {username,email,password,preferences}=req.body;
        if(!username || !email || !password)
            return res.status(401).json({msg:"All fields are required!"})

        const user=await User.findOne({email})
        if(user)
            return res.status(401).json({msg:'Email already in use'})
        const userEmail=await UserEmail.findOne({email})
        if(!userEmail || !userEmail.isVerified)
            return res.status(401).json({msg:'Please verify the email first'})
        if(password.length<8)
            return res.status(401).josn({msg:'Password must be strong'})
        const encryptPass=await bcrypt.hash(password,10)
        const newUser=new User({
            username,
            email,
            password:encryptPass,
            preferences
        })
        await newUser.save()
        return res.status(201).json({msg:'User registered successfully!'})
    } catch (err) {
        console.log('Error occured at registering user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password) 
            return res.status(404).json({msg:'Enter valid credentials'})
        const user=await User.findOne({email})
        if(!user || !await bcrypt.compare(password,user.password))
            return res.status(404).json({msg:'Invalid credentials'})
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('user_token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'None':'Lax',
            maxAge:60*60*1000
        })
        return res.status(200).json({msg:'Login successfull!',user})
    } catch (err) {
        console.log('Error occured at login user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const logoutUser=async(req,res)=> {
    try {
        const {user_token}=req.cookies

        if(user_token)
            return res.status(404).json({msg:'Cookie not found!'})

        res.clearCookie("user_token",{
            httpOnly:true,
            secure:true,
            sameSite:"None"
        })

        return res.status(200).json({msg:'Logout successfull!'})

    } catch (err) {
        console.log('Error occured at logout user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const getUserDetails=async(req,res)=> {
    try {
        const {id}=req
        const user=await User.findById(id,{password:0})
        if(!user)
            return res.status(404).json({msg:"User not found!"})
        return res.status(200).json(user)
    } catch (err) {
        console.log('Error occured at verifing user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const updatePreferences=async(req,res)=> {
    try {
        const {id}=req
        const {preferences}=req.body;
        const user=await User.findByIdAndUpdate(id,{$set:{
            preferences
        }})
        if(!user)
            return res.status(404).json({msg:'User not found!'})
        return res.status(200).json({msg:"Preferences updated successfully!"})

    } catch (err) {
         console.log('Error occured at updating user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}


module.exports={registerUser,loginUser,getUserDetails,logoutUser,updatePreferences}