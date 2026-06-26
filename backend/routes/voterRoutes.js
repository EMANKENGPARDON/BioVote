const express = require("express");

const {
  registerVoter,
  getVoters,
  getVoterByNationalId,
  getVoterByEmail,
  deleteVoter,
} = require("../controllers/voterController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/register", registerVoter);
router.get("/", getVoters);
router.get("/national/:nationalId", getVoterByNationalId);
router.get("/email/:email", getVoterByEmail);
router.delete("/:id", adminAuth, deleteVoter);

module.exports = router;
