import User from "./User";
import Sequelize from "sequelize";
import { sequelize } from "../database";
import modelNames from "../../enums/modelNames";

const Note = sequelize.define(
  modelNames.NOTE,
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sqliteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    dateTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
    version: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

// an additional column userId will be created
Note.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
export default Note;
