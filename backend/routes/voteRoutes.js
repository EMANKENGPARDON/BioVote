const express = require("express");

const { castVote, getVoteAnalytics } = require("../controllers/voteController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/", castVote);
router.get("/analytics", adminAuth, getVoteAnalytics);

module.exports = router;
