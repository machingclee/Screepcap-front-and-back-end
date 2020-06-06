import { sequelize } from "./database";
const User_Dictionary = sequelize.define("User_Profile", {}, { timestamps: false });

User_Dictionary;

// many to many, use this:
User.belongsToMany(Dictionary, { through: User_Dictionary });
Dictionary.belongsToMany(User, { through: User_Dictionary });
