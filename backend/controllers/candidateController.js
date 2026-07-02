const Candidate = require("../models/candidate");
const Election = require("../models/Election");
const {
  attachComputedVoteCounts,
  sortByComputedVoteCount,
} = require("../utils/candidateVoteCounts");

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
    const candidatesWithVoteCounts = await attachComputedVoteCounts(candidates);

    res.status(200).json(candidatesWithVoteCounts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getResults = async (req, res) => {
  try {
    const [election, candidates] = await Promise.all([
      Election.findOne().sort({ createdAt: -1 }).lean(),
      Candidate.find().lean(),
    ]);

    if (!election || election.status !== "Closed") {
      return res.status(403).json({
        message: "Results unavailable until election closes",
        election,
      });
    }

    const results = sortByComputedVoteCount(
      await attachComputedVoteCounts(candidates)
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidateUpdates = { ...req.body };
    delete candidateUpdates.voteCount;

    const candidate = await Candidate.findByIdAndUpdate(req.params.id, candidateUpdates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    const [candidateWithVoteCounts] = await attachComputedVoteCounts([candidate]);

    res.status(200).json(candidateWithVoteCounts);
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
