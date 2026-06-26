const Candidate = require("../models/candidate");
const Election = require("../models/Election");

// Register Candidate
const createCandidate = async (req, res) => {
  try {
    const {
      fullName,
      politicalParty,
      position,
      municipality,
      manifesto,
      photo,
    } = req.body;

    const candidate = await Candidate.create({
      fullName,
      politicalParty,
      position,
      municipality,
      manifesto,
      photo,
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Candidates
const getCandidates = async (req, res) => {
  try {
    const filter = req.query.municipality
      ? { municipality: String(req.query.municipality).trim() }
      : {};
    const candidates = await Candidate.find(filter).lean();

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getResults = async (req, res) => {
  try {
    const [election, results] = await Promise.all([
      Election.findOne().sort({ createdAt: -1 }).lean(),
      Candidate.find().sort({ voteCount: -1 }).lean(),
    ]);

    if (!election || election.status !== "Closed") {
      return res.status(403).json({
        message: "Results unavailable until election closes",
        election,
      });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      message: "Candidate deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  getResults,
  updateCandidate,
  deleteCandidate,
};
