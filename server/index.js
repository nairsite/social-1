import express from "express";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import likeRouter from "./routes/likeRoutes.js";
import mongoose from "mongoose";
import path from "path"
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
// const PORTS = process.env.PORTS.split(',')
const PORT = process.argv[2] || "8080"
console.log(PORT)
// console.log(PORTS1)
// const PORTS = [8080,8081]
app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

const _dirname=path.dirname("")
const buildpath = path.join(_dirname,"../client/build")
app.use(express.static(buildpath))

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);

// app.use("/products", postRouter);

app.get("/port",(req,res)=>{
  res.send(PORT)
})

mongoose
  .connect("mongodb://mongo:27017/social")
  .then(() => {
       app.listen(8080, () => {
        //console.log(`Server Started on port ${PORT}`);
    // PORTS.forEach(PORT => {
    //   app.listen(PORT, () => {
    //     console.log(`Server Started on port ${PORT}`);
    //   });
    });
    
  })
  .catch((error) => {
    console.log(error);
  });
