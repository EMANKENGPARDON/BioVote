const Voter = require("../models/voter");
const Election = require("../models/Election");
const getVoters = async (req, res) => {
  try {
    const voters = await Voter.find().lean();
    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVoterByNationalId = async (req, res) => {
  try {
    const voter = await Voter.findOne({
      nationalId: req.params.nationalId,
    });

    if (!voter) {
      return res.status(404).json({
        message: "Voter not found",
      });
    }

    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVoterByEmail = async (req, res) => {
  try {
    const voter = await Voter.findOne({
      email: String(req.params.email || "").trim().toLowerCase(),
    });

    if (!voter) {
      return res.status(404).json({
        message: "Voter not found",
      });
    }

    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Register voter
const registerVoter = async (req, res) => {
  try {
    const {
      fullName,
      nationalId,
      email,
      phoneNumber,
      municipality,
      faceImage,
    } = req.body;

    if (!fullName || !nationalId || !email || !municipality || !faceImage) {
      return res.status(400).json({
        message: "Full name, National ID, email, municipality, and facial image are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const [existingNationalId, existingEmail] = await Promise.all([
      Voter.findOne({ nationalId }).lean(),
      Voter.findOne({ email: normalizedEmail }).lean(),
    ]);

    if (existingNationalId) {
      return res.status(400).json({
        message: "National ID already registered",
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const voter = await Voter.create({
      fullName,
      nationalId,
      email: normalizedEmail,
      phoneNumber,
      municipality,
      faceImage,
    });

    res.status(201).json({
      message: "Registration Successful. You may now log in and participate in elections when voting is active.",
      voter,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteVoter = async (req, res) => {
  try {
    const voter = await Voter.findByIdAndDelete(req.params.id);

    if (!voter) {
      return res.status(404).json({
        message: "Voter not found",
      });
    }

    res.status(200).json({
      message: "Voter deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerVoter,
  getVoters,
  getVoterByNationalId,
  getVoterByEmail,
  deleteVoter,
};
