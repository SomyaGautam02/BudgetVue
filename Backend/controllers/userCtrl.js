const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({
        Status:"oldUser"
      });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          UserModel.create({ name, email, password: hash })
            .then((Users) => res.json(Users))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          return res.json({
            Status: "Success",
            Name: user.name,
            Email: user.email,
          });
        } else {
          return res.json("The password is incorrect");
        }
      });
    } else {
      return res.json("No Such User exists");
    }
  });
};

module.exports = { loginUser, registerUser };

