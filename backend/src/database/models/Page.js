import Sequelize from "sequelize";
import { sequelize } from "../database";
import { modelNames } from "../../enums/modelNames";
import Note from "./Note";

const Page = sequelize.define(
  modelNames.PAGE,
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
    // sqliteNoteId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    //   // references: {
    //   //   model: Note,
    //   //   key: "sqliteId"
    //   // }
    // },
    name: {
      type: Sequelize.STRING
    },
    dateTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
    croppedScreenshot: {
      type: Sequelize.STRING,
      allowNull: false
    },
    version: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: true
  }
);

// an additional column sqliteNoteId will be created
Page.belongsTo(Note, { foreignKey: "sqliteNoteId", targetKey: "sqliteId" });
export default Page;
