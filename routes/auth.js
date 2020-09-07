const express = require("express");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const router = express.Router();
const { check } = require("express-validator");

// Signup Route
router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail().withMessage("Please enter proper email id"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long"),
  ],
  signup
);

// SignIn Route
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email entered is wrong"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password Entered is Wrong please enter again"),
  ],
  signin
);

// SignOut Route
router.get("/signout", signout);

module.exports = router;
