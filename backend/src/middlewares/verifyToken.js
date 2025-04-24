const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=> {
    try {
        const {user_token}=req.cookies
        if(!user_token)
            return res.status(404).json({msg:'Token not found!'})
        const decoded=jwt.verify(user_token,process.env.JWT_SECRET)

        if(!decoded)
            return res.status(403).json({msg:'Token is invalid or expired'})

        req.id=decoded.id
        next()
        
    } catch (err) {
        console.log('Error at verifying token ',err)
        return res.status(500).json({msg:'Token not found!'})     
    }
}

module.exports=verifyToken