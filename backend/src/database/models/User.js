import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../database";
import { compare } from "../../Utils/bcrypt/index";
import { modelNames } from "../../enums/modelNames";

const User = sequelize.define(
  modelNames.USER,
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
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    push_notification_token: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

export default User;
