const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Siddharthisagoodb$oy'
//create a user using: POST "/api/auth". Doesn't require auth
//we create validation using express-validator ==>> [here we create array and write our validation]
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be greater then 5 digit").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check wheather the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // console.log(user);
        return res
          .status(400)
          .json({ error: "Sorry a user wiht this email is already exists" });
      }

      //Here we hashing password using "https://www.npmjs.com/package/bcryptjs"---we adding genSalt hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data ={
        user:{
          id: user.id
        }
      }
      const authtoken= jwt.sign(data, JWT_SECRET);
      
      // res.json(user);
      res.json({authtoken: authtoken})

      //catch error
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;