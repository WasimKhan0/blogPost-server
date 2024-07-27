const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
    
        comment:{
           type:String,
           require:true
        },
        author:{
            type:String,
            require:true
         },
         postId:{
            type:String,
            require:true
         },
         
         userId:{
            type:String,
            require:true
         }
       
},{timestamps:true});

const Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment;