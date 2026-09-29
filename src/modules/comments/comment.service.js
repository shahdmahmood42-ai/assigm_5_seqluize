import commentModel from "../../DB/models/comment.model.js";
import { Op } from "sequelize";
import userModel from "../../DB/models/user.model.js";
import postModel from "../../DB/models/post.model.js";
export const createBulkComments = async (req, res) => {
  try {
    const { comments } = req.body;
    if (!Array.isArray(comments) || comments.length === 0) {
      return res
        .status(400)
        .json({ message: "comments must be a non-empty array." });
    }
    await commentModel.bulkCreate(comments);

    return res.status(201).json({ message: "comments created." });
  } catch (err) {
    const errors = err.errors ? err.errors.map((e) => e.message) : [err.message];
    return res.status(400).json({ message: "Validation error", errors });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await commentModel.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "comment not found." });
    }

    if (comment.userId !== Number(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this comment." });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({ message: "Comment updated." });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await commentModel.findOrCreate({
      where: { postId, userId, content },
    });

    return res.status(created ? 201 : 200).json({ comment, created });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;

    const { count, rows } = await commentModel.findAndCountAll({
      where: { content: { [Op.like]: `%${word}%` } },
    });

    if (count === 0) {
      return res.status(404).json({ message: "no comments found." });
    }

    return res.status(200).json({ count, comments: rows });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await commentModel.findAll({
      where: { postId },
      attributes: ["id", "content", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentModel.findByPk(id, {
      attributes: ["id", "content"],
      include: [
        { model: userModel, as: "user", attributes: ["id", "name", "email"] },
        { model: postModel, as: "post", attributes: ["id", "title", "content"] },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: "no comment found" });
    }
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};