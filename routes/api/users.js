const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const keys = require("../../config/keys");
const sgMail = require("@sendgrid/mail");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const Token = require("../../models/Token");
// router.post('/confirmation', userController.confirmationPost);
// router.post('/resend', userController.resendTokenPost);
// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/confirmation/:tokenId", (req, res) => {
  // Find a matching token
  const tokentest = req.params.tokenId;
  console.log(Token);
  Token.findOne({ token: tokentest }, function(err, token) {
    if (!token)
      return res.status(400).send({
        type: "not-verified",
        msg:
          "We were unable to find a valid token. Your token may have expired."
      });
    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function(err, user) {
      console.log(token._userId);
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });
      if (user.isVerified)
        return res.status(400).send({
          type: "already-verified",
          msg: "This user has already been verified."
        });
      // Verify and save the user
      user.isVerified = true;
      user.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).send("The account has been verified. Please log in.");
        //res.redirect('http://localhost:3000/login');
      });
    });
  });
});
router.post("/register", (req, res) => {
  console.log(req.headers);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
              //creating a verification token for this user
              const token = new Token({
                _id: user._id,
                _userId: user._id,
                token: crypto.randomBytes(16).toString("hex")
              });
              console.log(token);
              token.save(err => {
                if (err) {
                  return res.status(500).send({ msg: "Token error" });
                }
              });
              //send the mail

              const msg = {
                to: user.email,
                from: "noreply@gsl.com",
                subject: "Account Verification Token",
                text:
                  "Hello,\n\n" +
                  "Please verify your account by clicking the link:" +
                  req.headers.origin +
                  "api/users/confirmation/" +
                  token.token +
                  "\n"
              };
              sgMail.send(msg);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    if (!user.isVerified) {
      console.log("user is not verified");
      // return res.json({
      //   emailnotverified: "Email is not verified."
      // });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        if (!user.isVerified) {
          return res
            .status(404)
            .json({ emailnotfound: "Email is not verified" });
        }
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
// @route POST api/users/resend
// @desc resend confirmation token
router.post("/resend", (req, res) => {});
module.exports = router;
