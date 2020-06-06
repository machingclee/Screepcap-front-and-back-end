import User from "./models/User";
import Dictionary from "./models/Dictionary";
import { sequelize as db } from "./database";

export function syncDbs() {
  db.sync({ force: true, alter: true }).then(() => {});
}

console.log(db.models.user);

// syncDbs();
