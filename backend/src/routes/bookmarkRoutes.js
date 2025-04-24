const express=require('express')

const {addBookmark,removeBookmark,gettingBookmarks}=require('../controllers/bookmarkControllers')
const verifyToken=require('../middlewares/verifyToken')

const routes=express.Router()

routes.get('/get-bookmarks',verifyToken,gettingBookmarks)
routes.post('/add-bookmark',verifyToken,addBookmark)
routes.delete('/delete-bookmark/:title',verifyToken,removeBookmark)

module.exports=routes