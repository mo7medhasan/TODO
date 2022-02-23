const User = require("../models/user.module.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//SIGN UP
exports.signUp = async (req, res, next) => {
  try {
    const [name, email, password] = await req.body;
    const validEmail = validator.isEmail(email);
    const validPass = validator.isStrongPassword(password);

    if (validEmail && validPass) {
      const newPassword = bcrypt.hashSync(password, 10);
      User.findOne({ email: email })
        .then((user) => {
          if (user)
            res
              .status(404)
              .json({ success: false, message: "please try again" });
          else {
            const user = new User({
              name: name,
              email: email,
              password: newPassword,
            });
            user
              .save()
              .then((data) => {
                res.status(200).json({
                  success: true,
                  data: data,
                  message: "welcome  you are registered successfully",
                });
              })
              .catch((err) => {
                res.status(401).json({
                  success: "error",
                  error: err,
                  message: "Check your Data ",
                });
              });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.status(401).json({
        message:
          "Not valid email or password or phone number please try again..",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const [email, password] = await req.body;
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "server error" });
      }
      !user &&
        res
          .status(401)
          .json({ success: false, message: "Wrong User Email or Password.." });

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong Password or Email.." });
      }
      if (!user.isAdmin) {
        const userToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        jwt.verify(userToken, process.env.JWT_SEC, (err, userData) => {
          if (userData) {
            console.log(userData);
            res
              .status(200)
              .send({ success: true, token: userToken, user: user });
          }
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "You'r not authenticated... " });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
