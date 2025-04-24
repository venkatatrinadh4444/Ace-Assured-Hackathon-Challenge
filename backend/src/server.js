require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const userEmailAuthRoutes=require('./routes/userEmailAuthControllers')
const userRoutes=require('./routes/userRoutes')
const cors=require('cors')
const bookmarkRoutes=require('./routes/bookmarkRoutes')

const app=express()
const PORT=process.env.PORT || 5000

app.use(cors({origin:"https://ace-assured-hackathon-challenge.vercel.app",credentials:true}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MONGO DB Connected successfully!")).catch(err=>console.log("Error occured at MongoDB Connection ",err))


app.use('/email-auth',userEmailAuthRoutes)
app.use('/auth',userRoutes)
app.use('/auth-bookmarks',bookmarkRoutes)



app.listen(PORT,()=>console.log(`Server started and running at ${PORT}`))