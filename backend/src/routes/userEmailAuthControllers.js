const express=require('express')

const {sendOtp,verifyOtp}=require('../controllers/userEmailAuthControllers')

const routes=express.Router()


routes.post('/send-otp',sendOtp)
routes.post('/verify-otp',verifyOtp)

module.exports=routes