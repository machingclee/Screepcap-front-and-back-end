import User from "./User";
import Sequelize from "sequelize";
import { sequelize } from "../database";
import modelNames from "../../enums/modelNames";

const Dictionary = sequelize.define(
  "dictionary",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    pageId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    vocab: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    pronounciation: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    explanation: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    },
    version: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    }
  },
  {
    timestamps: true
  }
);

Dictionary.belongsTo(User);

export default Dictionary;
