const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = (req, res, db) => {
  const { fname, lname, email, password } = req.body;
  db("users")
    .where({ email })
    .count("email")
    .then(count => {
      console.log(count[0].count);
      if (count[0].count <= 0) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            console.log(hash);
            db("users")
              .insert({ fname, lname, password: hash, email })
              .returning("*")
              .then(user => {
                res.json(user);
              })
              .catch(err =>
                res
                  .status(400)
                  .json({ msg: `user in not able to register ${err}` })
              );
          });
        });
      } else {
        res.status(400).json({ msg: "user exist" });
      }
    });
};

const signin = (req, res, db) => {
  const { email, password } = req.body;
  db("users")
    .where({ email })
    .count("email")
    .then(count => {
      if ((count[0].count = 0)) {
        return res.status(400).json({ msg: "user does not exist" });
      } else {
        db("users")
          .where({ email })
          .returning("*")
          .then(user => {
            bcrypt.compare(password, user[0].password, (err, result) => {
              if (err) {
                return res
                  .status(400)
                  .json({ msg: `user is not able to login` });
              } else if (result) {
                const token = jwt.sign(
                  { email },
                  "my-secret-hello-to-everyOne",
                  { expiresIn: "5h" }
                );
                res.json({ msg: "auth success", token });
              } else {
                res
                  .status(400)
                  .json({ msg: `user is not able to login hello` });
              }
            });
          })
          .catch(err =>
            res.status(400).json({ msg: `user is not able to login  ${err}` })
          );
      }
    });
};

module.exports = { signup, signin };
