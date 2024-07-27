const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const verifyToken = require("../verifyToken");

//create post
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been Deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get post details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get All posts
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const posts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user posts
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/likes/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const { userId } = req.body;
    const post = await Post.findById(id);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      const newPost = await Post.findById(id);

      res.status(200).json({data:"postliked",newPost:newPost});
    }else{
      await post.updateOne({ $pull: { likes: userId } });
      const newPost = await Post.findById(id);

      res.status(200).json({data:"postdisliked",newPost:newPost});
    }
  }catch(err){
    console.log(err);
  }
})


module.exports = router;
