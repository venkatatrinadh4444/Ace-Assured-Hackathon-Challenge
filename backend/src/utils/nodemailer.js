
const { model } = require('mongoose')
const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

const sendMail=(email,otp)=>{
    const options={
        from:process.env.USER,
        to:email,
        subject:"Email OTP verification",
        html:`<div>
           <h2 style="color:blue">Welcome to News Aggregator</h2>
           <p>Please use this otp to verify your email and It is valid only <b>Five Minutes</b></p>
           <p style="font-size:28px;font-weight:bold;background:black;color:white;text-align:center;padding:1px 6px;">${otp}</p>
        </div>`
    }
    return transporter.sendMail(options)
}

module.exports=sendMail