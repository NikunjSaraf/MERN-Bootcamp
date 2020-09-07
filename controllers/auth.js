require("dotenv").config();
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// Signup Controller
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save the user in database",
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

// Signin Controller
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exists please signup",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "User email and password does not match",
      });
    }

    // Generate Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Put token in user cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send data to front-end
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

// Signout Controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User Signout" });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    res.status(403).json({
      message: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      message: "ACCESS DENIED Cant Access this page",
    });
  }
  next();
};
