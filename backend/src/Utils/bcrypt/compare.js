import bcrypt from "bcrypt";

function compare(plainTextPassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, hash).then(function (result) {
      resolve(result);
    });
  });
}

export default compare;
