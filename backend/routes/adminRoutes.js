const express = require("express");
const {
  getElection,
  createOrUpdateElection,
  startElection,
  endElection,
} = require("../controllers/electionController");
const { login } = require("../controllers/adminController");
const { getBlocks } = require("../controllers/blockController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", login);
router.get("/election-status", getElection);
router.get("/election", adminAuth, getElection);
router.post("/election", adminAuth, createOrUpdateElection);
router.patch("/election/start", adminAuth, startElection);
router.patch("/election/end", adminAuth, endElection);
router.get("/blockchain", adminAuth, getBlocks);

module.exports = router;
