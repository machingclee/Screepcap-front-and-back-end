import User from "./User";
import Sequelize from "sequelize";
import { sequelize } from "../database";
import Page from "./Page";
import { modelNames } from "../../enums/modelNames";

const Vocab = sequelize.define(
  modelNames.VOCAB,
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
    // sqlitePageId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    //   // references: {
    //   //   model: Page,
    //   //   key: "sqliteId"
    //   // }
    // },
    word: {
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
    }
  },
  {
    timestamps: true
  }
);

// an additional column sqlitePageId will be created
Vocab.belongsTo(Page, { foreignKey: "sqlitePageId", targetKey: "sqliteId" });

export default Vocab;
