import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connectionDB.js";

class commentModel extends Model {}

commentModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,
  }
);

export default commentModel;