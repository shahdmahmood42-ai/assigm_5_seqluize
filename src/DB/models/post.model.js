import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connectionDB.js";

class postModel extends Model {}

postModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true,
    paranoid: true,
  }
);

export default postModel;