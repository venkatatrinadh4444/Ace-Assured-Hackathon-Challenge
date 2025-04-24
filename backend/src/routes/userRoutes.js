const express=require('express')

const {registerUser,loginUser,getUserDetails, logoutUser, updatePreferences}=require('../controllers/userControllers')
const verifyToken = require('../middlewares/verifyToken')

const routes=express.Router()

routes.post('/register-user',registerUser)
routes.post('/login-user',loginUser)
routes.get('/get-user',verifyToken,getUserDetails)
routes.delete('/logout-user',logoutUser)
routes.put('/update-preferences',verifyToken,updatePreferences)


module.exports=routes