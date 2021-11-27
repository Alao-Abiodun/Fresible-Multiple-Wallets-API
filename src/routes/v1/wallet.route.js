const express = require("express");
const router = express.Router();
const { validateUserToken } = require("../../middleware/validation");

const {
  createWallet,
  createWalletTransaction,
  createTransaction,
  updateWallet,
  fetchWallets,
} = require("../../controllers/wallet.controller");

router.get("/fetchAll", fetchWallets);

router.post("/create", validateUserToken, createWallet);
router.post("/walletTransaction", createWalletTransaction);
router.post("createTransaction", createTransaction);

router.patch("/updateWallet", updateWallet);

module.exports = router;
