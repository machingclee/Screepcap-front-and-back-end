import bcrypt from "bcrypt";
const saltRounds = 10;

function hashing(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (!err) {
          resolve(hash);
        } else {
          reject(err);
        }
      });
    });
  });
}

export default hashing;
