const express = require("express");
const router = express.Router();
const { validateUserToken } = require("../../middleware/validation");

const {
  register,
  login,
  fetchUsers,
  userWalletDetails,
} = require("../../controllers/user.controller");

router.get("/fetch", validateUserToken, fetchUsers);
router.get("/userWalletDetail", userWalletDetails);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
