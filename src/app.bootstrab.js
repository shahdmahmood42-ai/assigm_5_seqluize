import express from "express";
import { connectionDB } from "./DB/connectionDB.js";
import "./DB/models/associations.js";
import userModel from "./DB/models/user.model.js";
import postModel from "./DB/models/post.model.js";
import commentModel from "./DB/models/comment.model.js";
import userRouter from "./modules/users/user.controler.js";
import postRouter from "./modules/posts/post.controler.js";
import commentRouter from "./modules/comments/comment.controler.js";
const app = express();
const port = 3000;

const bootstrab = async () => {
  app.use(express.json());

  app.get("/", (req, res) =>
    res.status(200).json({ message: "hello on app" })
  );

  await connectionDB();
  
  await userModel.sync({ alter: false });
  await postModel.sync({ alter: false });
  await commentModel.sync({ alter: false });

  app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
  app.use("{/*demo}", (req, res, next) => {
    res.status(404).json({
      message: `url: ${req.originalUrl} with method ${req.method} not found, status Code:404`,
    });
  });

  app.listen(port, () => console.log(`example port ${port}`));
};
export default bootstrab;