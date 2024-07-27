const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    
        title:{
           type:String,
           require:true
        },
        desc:{
            type:String,
            require:true
         },
         photo:{
            type:String,
            require:true
         },
         username:{
            type:String,
            require:true
         },
         userId:{
            type:String,
            require:true
         },
         categories:{
            type:Array
         },
         likes:{
           type:Array
         }
    
},{timestamps:true});

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;