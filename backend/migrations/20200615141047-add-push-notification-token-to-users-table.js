"use strict";
import { modelNames } from "../src/enums/modelNames";
import { Sequelize, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(modelNames.USER + "s", "push_notification_token", {
      type: DataTypes.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      modelNames.USER + "s",
      "push_notification_token",
      {}
    );
  }
};
