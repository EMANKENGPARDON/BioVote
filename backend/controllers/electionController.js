const Election = require("../models/Election");

const getElection = async (req, res) => {
  try {
    const election = await Election.findOne().sort({ createdAt: -1 }).lean();
    return res.status(200).json(election || null);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createOrUpdateElection = async (req, res) => {
  try {
    const { title, municipality, startDate, endDate, status } = req.body;

    let election = await Election.findOne().sort({ createdAt: -1 });

    if (election && election.status !== "Closed") {
      election.title = title;
      election.municipality = municipality;
      election.startDate = startDate;
      election.endDate = endDate;
      election.status = status || "Upcoming";
      await election.save();
    } else {
      election = await Election.create({
        title,
        municipality,
        startDate,
        endDate,
        status: status || "Upcoming",
      });
    }

    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const startElection = async (req, res) => {
  try {
    const election = await Election.findOne().sort({ createdAt: -1 });

    if (!election) {
      return res.status(404).json({
        message: "No election found to start.",
      });
    }

    election.status = "Active";
    election.startDate = election.startDate || new Date();
    await election.save();

    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const endElection = async (req, res) => {
  try {
    const election = await Election.findOne().sort({ createdAt: -1 });

    if (!election) {
      return res.status(404).json({
        message: "No election found to end.",
      });
    }

    election.status = "Closed";
    election.endDate = new Date();
    await election.save();

    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getElection,
  createOrUpdateElection,
  startElection,
  endElection,
};
