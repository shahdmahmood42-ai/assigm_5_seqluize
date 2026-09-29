import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
} from "./post.service.js";

const postRouter = Router();

postRouter.post("/", createPost);
postRouter.get("/details", getPostsDetails);
postRouter.get("/comment-count", getPostsCommentCount);
postRouter.delete("/:postId", deletePost);

export default postRouter;