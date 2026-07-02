const Vote = require("../models/Vote");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const Election = require("../models/Election");
const {
  attachComputedVoteCounts,
  sortByComputedVoteCount,
} = require("../utils/candidateVoteCounts");

const {
  createBlock,
} = require("./blockController");

const generateTransactionId = async () => {
  const year = new Date().getFullYear();
  const count = await Vote.countDocuments();
  return `TX-${year}-${String(count + 1).padStart(6, "0")}`;
};

const castVote = async (req, res) => {
  try {
    const {
      voterId,
      candidateId,
    } = req.body;

    const [voter, election, candidate, existingVote] = await Promise.all([
      Voter.findById(voterId),
      Election.findOne({ status: "Active" }).sort({ createdAt: -1 }).lean(),
      Candidate.findById(candidateId),
      Vote.findOne({ voterId }).lean(),
    ]);

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    if (voter.hasVoted || existingVote) {
      return res.status(400).json({ message: "You have already voted" });
    }

    if (!election) {
      return res.status(403).json({
        message: "No active election currently. Please return when voting opens.",
      });
    }

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // SAVE VOTE

    const transactionId = await generateTransactionId();

    const vote =
      await Vote.create({
        voterId,
        candidateId,
        municipality: voter.municipality,
        transactionId,
      });

    // MARK VOTER AS VOTED

    voter.hasVoted = true;
    await voter.save();

    // CREATE BLOCKCHAIN RECORD

    const block =
      await createBlock({
        electionId:
          election._id,
        voterId:
          voter._id,
        candidateId:
          candidate._id,
        municipality:
          voter.municipality,
        timestamp:
          new Date(),
      });

    res.status(201).json({
      message:
        "Vote cast successfully",

      vote,

      blockchain: {
        blockIndex:
          block.index,

        transactionHash:
          block.voteHash,

        previousHash:
          block.previousHash,
      },

      transactionId,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already voted",
      });
    }

    res.status(500).json({
      message:
        error.message,
    });

  }
};

const getVoteAnalytics = async (req, res) => {
  try {
    const [totalRegisteredVoters, totalVotes, candidates] = await Promise.all([
      Voter.countDocuments(),
      Vote.countDocuments(),
      Candidate.find().lean(),
    ]);

    const candidateRankings = sortByComputedVoteCount(
      await attachComputedVoteCounts(candidates)
    );

    const turnout =
      totalRegisteredVoters > 0
        ? Number(((totalVotes / totalRegisteredVoters) * 100).toFixed(1))
        : 0;

    res.status(200).json({
      totalRegisteredVoters,
      totalVotesCast: totalVotes,
      turnoutPercentage: turnout,
      candidateRankings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  castVote,
  getVoteAnalytics,
};
