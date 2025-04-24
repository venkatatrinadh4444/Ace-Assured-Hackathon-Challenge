const Bookmark = require("../models/Bookmark");


const addBookmark=async(req,res)=> {
    try {
        const {id}=req
        const {urlToImage,title,publishedAt,url}=req.body;
        if(!title || !publishedAt)
            return res.status(403).json({msg:'All fields are required'})
        const newBookmark=new Bookmark({
            userId:id,
            urlToImage,
            title,
            publishedAt,
            url
        })
        await newBookmark.save()
        return res.status(201).json({msg:"Bookmark added successfully!"})
    } catch (err) {
        console.log("Error at adding bookmark ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const removeBookmark=async(req,res)=> {
    try {
        const {id}=req
        const {title}=req.params
        const bookmark=await Bookmark.findOneAndDelete({title,userId:id})

        if(!bookmark)
            return res.status(404).json({msg:'Bookmark not found!'})

        return res.status(200).json({msg:'Bookmark removed successfully!'})
            
    } catch (err) {
        console.log("Error at deleting bookmark ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const gettingBookmarks=async(req,res)=> {
    try {
        const {id}=req
        const bookmarks=await Bookmark.find({userId:id})
        return res.status(200).json(bookmarks)
    } catch (err) {
        console.log("Error at getting bookmarks ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={addBookmark,removeBookmark,gettingBookmarks}