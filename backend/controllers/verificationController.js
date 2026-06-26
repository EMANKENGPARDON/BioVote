const VerificationRequest = require(
  "../models/VerificationRequest"
);

const createRequest = async (req, res) => {
  try {
    const {
      voterId,
      nationalId,
      registeredImage,
      liveImage,
    } = req.body;

    const request =
      await VerificationRequest.create({
        voter: voterId,
        nationalId,
        registeredImage,
        liveImage,
      });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests =
      await VerificationRequest.find()
        .populate("voter", "fullName nationalId municipality")
        .sort({ createdAt: -1 })
        .lean();

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveRequest = async (req, res) => {
  try {
    const request =
      await VerificationRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Approved";
    request.reviewedBy = "Admin";

    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const request =
      await VerificationRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Rejected";
    request.reviewedBy = "Admin";

    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVerificationStatus = async (req, res) => {
  try {
    const request = await VerificationRequest.findOne({
      nationalId: req.params.nationalId,
    }).sort({ createdAt: -1 });

    if (!request) {
      return res.status(404).json({
        message: "No verification request found",
      });
    }

    res.json({
      status: request.status,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getRequests,
  approveRequest,
  rejectRequest,
  getVerificationStatus,
};