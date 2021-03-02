const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/sign-in", passport.isUserLogedIn, userController.signIn);
router.get("/sign-up", passport.isUserLogedIn, userController.signUp);
router.post("/createUser", userController.createUser);
router.get("/sign-out", userController.signOut);
router.get("/profile", passport.checkAuthentication, userController.profile);
router.post(
  "/create-session",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/sign-up",
  })
);

module.exports = router;
