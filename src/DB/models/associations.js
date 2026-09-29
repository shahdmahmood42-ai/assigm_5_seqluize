import userModel from "./user.model.js";
import postModel from "./post.model.js";
import commentModel from "./comment.model.js";

userModel.hasMany(postModel, { foreignKey: "userId" });
postModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

postModel.hasMany(commentModel, { foreignKey: "postId", as: "comments" });
commentModel.belongsTo(postModel, { foreignKey: "postId", as: "post" });

userModel.hasMany(commentModel, { foreignKey: "userId" });
commentModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });