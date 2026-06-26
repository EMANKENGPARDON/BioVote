const express = require("express");
const adminAuth = require("../middleware/adminAuth");

const {
  createCandidate,
  getCandidates,
  getResults,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");

const router = express.Router();

router.post("/", adminAuth, createCandidate);
router.get("/", getCandidates);
router.get("/results", getResults);
router.patch("/:id", adminAuth, updateCandidate);
router.delete("/:id", adminAuth, deleteCandidate);

module.exports = router;
