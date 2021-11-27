const User = require("../models/user.model");
const Response = require("../lib/response");
const Error = require("../lib/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { TOKEN } = process.env;

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!(firstname && lastname && email && password)) {
      throw Error("All field is required", "BAD REQUEST", 401);
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw Error("User already exists", "BAD REQUEST", 401);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashPassword,
    });
    const token = await jwt.sign(
      { _id: newUser._id, email: newUser.email },
      TOKEN,
      { expiresIn: "2h" }
    );
    user.token = token;
    Response(res).success({ newUser }, 201);
  } catch (error) {
    console.log(error);
    Response(res).error(error.message, error.code);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw Error("Please fill in the required field", "BAD REQUEST", 401);
    }

    const existingUser = await User.findOne({ email });
    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const token = await jwt.sign(
        { _id: existingUser._id, email: existingUser.email },
        TOKEN,
        { expiresIn: "2h" }
      );
      user.token = token;
      Response(res).success({ existingUser }, 200);
    }
    throw Error("Invalid Credentials", "BAD REQUEST", 401);
  } catch (error) {
    Response(res).error(error.message, error.code);
  }
};
