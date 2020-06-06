import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { compare } from "../../Utils/bcrypt/index";

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

export default User;
