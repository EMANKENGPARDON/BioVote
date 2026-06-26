const express = require("express");

const router = express.Router();

const {
  createRequest,
  getRequests,
  approveRequest,
  rejectRequest,
  getVerificationStatus,
} = require(
  "../controllers/verificationController"
);

router.post("/", createRequest);

router.get("/", getRequests);

router.patch(
  "/approve/:id",
  approveRequest
);

router.get(
  "/status/:nationalId",
  getVerificationStatus
);

router.patch(
  "/reject/:id",
  rejectRequest
);

module.exports = router;