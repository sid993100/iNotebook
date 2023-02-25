const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "Siddharthisagoodb$oy";
//Router-1 : create a user using: POST "/api/auth". Doesn't require auth
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

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json({ authtoken: authtoken });

      //catch error
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Router-2 : Authenticatiate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Router-3 : LoggedIn user using detail-fetching: POST "/api/auth/getuser".  login required
router.post("/getuser", async (req, res) => {
    try {
      userId = "todo";
      const user = await User.findById(userId.select("-password"));
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;