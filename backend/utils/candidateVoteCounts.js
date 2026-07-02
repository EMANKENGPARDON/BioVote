const Vote = require("../models/Vote");

const attachComputedVoteCounts = async (candidates) => {
  if (!candidates.length) {
    return candidates;
  }

  const candidateIds = candidates.map((candidate) => candidate._id);
  const voteCounts = await Vote.aggregate([
    { $match: { candidateId: { $in: candidateIds } } },
    { $group: { _id: "$candidateId", voteCount: { $sum: 1 } } },
  ]);

  const countsByCandidateId = new Map(
    voteCounts.map((result) => [String(result._id), result.voteCount])
  );

  return candidates.map((candidate) => ({
    ...candidate,
    voteCount: countsByCandidateId.get(String(candidate._id)) || 0,
  }));
};

const sortByComputedVoteCount = (candidates) =>
  [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

module.exports = {
  attachComputedVoteCounts,
  sortByComputedVoteCount,
};
