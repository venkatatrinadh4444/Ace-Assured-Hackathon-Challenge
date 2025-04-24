
const mongoose=require('mongoose')

const bookmarkSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bookmark"
    },
    urlToImage:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    publishedAt:{
        type:String,
        required:true
    },
    url:{
        type:String
    },
})

module.exports=mongoose.model('Bookmark',bookmarkSchema)