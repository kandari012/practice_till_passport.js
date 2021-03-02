const User = require("../models/user");
module.exports.signIn = function (req, res) {
  res.render("user_sign-in", { title: "sign_in" });
};

module.exports.signUp = function (req, res) {
  res.render("user_sign-up", { title: "sign_in" });
};

module.exports.profile = function (req, res) {
  res.render("user_profile", { title: "sign_in" });
};

module.exports.signOut = function (req, res) {
  req.logout();
  console.log("i am logout");
  return res.redirect("/users/sign-in");
};
module.exports.createUser = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error while finding user");
      return res.redirect("back");
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error while craeting user");
          return res.redirect("back");
        }
        return res.redirect("/");
      });
    } else {
      return res.redirect("back");
    }
  });
};
