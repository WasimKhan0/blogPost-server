const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // Added body-parser

const app = express();
const multer = require("multer");
const authRouter = require("./Routes/AuthRoute");
const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/PostRoute");
const commentRouter = require("./Routes/commentRoute");
const path = require("path");

const uri = "mongodb+srv://wk09908:1234@cluster0.xzewvow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(bodyParser.json()); // Add this to parse JSON request bodies
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Correct the frontend origin if necessary
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

const storage = multer.diskStorage({
  destination: (req, res, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  }
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file", (req, res) => {
  res.status(200).json("Image has been uploaded");
}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
