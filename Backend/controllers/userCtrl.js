const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({
        Status: "oldUser",
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
            U_id: user._id,
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

const ChangePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(currentPassword, user.password, async (err, response) => {
      if (response) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.status(200).json({ Status: "true" });
      } else {
        return res.status(200).json({ Status: "false" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change password" });
  }
};

module.exports = { loginUser, registerUser, ChangePassword };
