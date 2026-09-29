import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";
import commentModel from "../../DB/models/comment.model.js";
import { fn, col } from "sequelize";
export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const post = new postModel({ title, content, userId });
    await post.save();

    return res.status(201).json({ message: "Post created successfully." });
  } catch (err) {
    const errors = err.errors ? err.errors.map((e) => e.message) : [err.message];
    return res.status(400).json({ message: "Validation error", errors });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body; 

    const post = await postModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId !== Number(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post." });
    }

    await post.destroy(); 
    return res.status(200).json({ message: "Post deleted." });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getPostsDetails = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title"],
      include: [
        { model: userModel, as: "user", attributes: ["id", "name"] },
        { model: commentModel, as: "comments", attributes: ["id", "content"] },
      ],
    });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getPostsCommentCount = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: [
        "id",
        "title",
        [fn("COUNT", col("comments.id")), "commentCount"],
      ],
      include: [{ model: commentModel, as: "comments", attributes: [] }],
      group: ["Post.id"],
    });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};