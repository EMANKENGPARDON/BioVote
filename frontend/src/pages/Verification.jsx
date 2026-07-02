import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ShieldCheck, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { saveJson, WORKFLOW_KEYS } from "../utils/workflowSession";
import {
  pageWrapper,
  pageContainer,
  sectionCard,
  sectionCardContent,
  pageHeading,
  pageSubheading,
  inputStyles,
  outlineButton,
  primaryButton,
} from "../utils/pageStyles";


function Verification() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [nationalId, setNationalId] = useState("");
  const [voter, setVoter] = useState(null);
  const [capturedImage, setCapturedImage] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [status, setStatus] = useState({ type: "info", text: "Enter your ID card number to begin facial verification." });
  const [loading, setLoading] = useState(false);
  const [verificationRejected, setVerificationRejected] = useState(false);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
    setCameraOpen(false);
  };

  const [retryConfirmOpen, setRetryConfirmOpen] = useState(false);

  const openRetryConfirmation = () => {
    setRetryConfirmOpen(true);
  };

  const confirmRetryVerification = async () => {
    setRetryConfirmOpen(false);
    setVerificationRejected(false);
    setCapturedImage("");
    setStatus({ type: "info", text: "Retry facial verification by opening the camera again." });
    closeCamera();
    if (voter) {
      await openCamera();
    }
  };

  const findVoter = async () => {
    setVerificationRejected(false);
    if (!nationalId.trim()) {
      setStatus({ type: "warning", text: "Please enter your national ID number." });
      return null;
    }

    try {
      const response = await API.get(`/voters/national/${encodeURIComponent(nationalId.trim())}`);
      setVoter(response.data);
      if (response.data.hasVoted) {
        setStatus({ type: "warning", text: "You have already voted." });
        return null;
      }
      if (!response.data.faceImage) {
        setStatus({ type: "warning", text: "No registered face photo was found for this voter." });
        return null;
      }
      setStatus({ type: "success", text: "Voter found. Camera is opening for facial verification." });
      await openCamera();
      return response.data;
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Could not find a voter with that national ID. Please check the number and try again.",
      });
      return null;
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOpen(true);
      setStatus({ type: "info", text: "Camera ready. Capture a clear frontal face image." });
    } catch {
      setStatus({ type: "error", text: "Camera access was denied or unavailable." });
    }
  };

  const checkApprovalStatus = async () => {
  try {
    const response = await API.get(
      `/verifications/status/${nationalId}`
    );

    if (response.data.status === "Approved") {
      saveJson(
        WORKFLOW_KEYS.verifiedVoter,
        voter
      );

      setStatus({
        type: "success",
        text:
          "Verification approved. Redirecting to voting page...",
      });

      setTimeout(() => {
        navigate("/vote");
      }, 1500);

    } else if (
      response.data.status === "Rejected"
    ) {
      closeCamera();
      setCapturedImage("");
      setVerificationRejected(true);
      setStatus({
        type: "error",
        text:
          "Your verification request was rejected by the administrator. Please retry biometric verification or return home.",
      });

    } else {
      setStatus({
        type: "info",
        text:
          "Your verification request is still pending approval.",
      });
    }

  } catch (error) {
    setStatus({
      type: "error",
      text:
        error.response?.data?.message ||
        "Could not retrieve verification status.",
    });
  }
};

  const captureFace = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
      setStatus({ type: "warning", text: "Camera is still starting. Wait a moment, then capture again." });
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/png"));
    setStatus({ type: "info", text: "Face captured. Camera turned off. Click Verify and Continue." });
    closeCamera();
  };

  const verifyFace = async () => {
  try {
    setLoading(true);

    await API.post(
      "/verifications",
      {
        voterId: voter._id,
        nationalId: voter.nationalId,
        registeredImage: voter.faceImage,
        liveImage: capturedImage,
      }
    );

 setStatus({
  type: "success",
  text:
    "Verification request submitted. Please wait for administrator approval, then click Check Approval Status.",
});

  } catch (error) {
    setStatus({
      type: "error",
      text:
        error.response?.data?.message ||
        "Verification request failed.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <Box sx={pageWrapper}>
      <Box sx={pageContainer}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card sx={sectionCard}>
            <CardContent sx={sectionCardContent}>
              <Typography component="h1" sx={pageHeading}>
                Login to Vote
              </Typography>
              <Typography sx={{ ...pageSubheading, mt: 1, mb: 3 }}>
                Enter your national ID number, then confirm your identity with facial verification.
              </Typography>

              <Alert severity={status.type} sx={{ mb: 3 }}>
                {status.text}
                {verificationRejected && (
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={openRetryConfirmation}
                      sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
                    >
                      Retry Verification
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate("/")}
                      sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
                    >
                      Return Home
                    </Button>
                  </Box>
                )}
              </Alert>

              <Dialog
                open={retryConfirmOpen}
                onClose={() => setRetryConfirmOpen(false)}
                maxWidth="xs"
                fullWidth
              >
                <DialogTitle>Retry Verification</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Your verification request was rejected. Do you want to retry biometric verification now?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setRetryConfirmOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={confirmRetryVerification} variant="contained" color="primary">
                    Retry
                  </Button>
                </DialogActions>
              </Dialog>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" },
                  gap: 3,
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    label="National ID"
                    type="text"
                    value={nationalId}
                    onChange={(event) => setNationalId(event.target.value)}
                    sx={{ ...inputStyles, mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={findVoter}
                    disabled={loading}
                    sx={{ mb: 2, borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
                  >
                    Retrieve Voter by ID and Open Camera
                  </Button>

                  {voter && (
                    <Box sx={{ mt: 3, p: 2, border: "1px solid #dbe7ff", borderRadius: "12px" }}>
                      <Typography fontWeight={900} color="#08295c">
                        {voter.fullName}
                      </Typography>
                      <Typography color="#506784">{voter.municipality}</Typography>
                      {voter.hasVoted && (
                        <Typography color="#b42318" fontWeight={800} mt={1}>
                          You have already voted
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography fontWeight={900} color="#08295c" mb={1}>
                        {capturedImage ? "Live Capture" : "Live Camera"}
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          aspectRatio: "4 / 3",
                          background: "#dbe7ff",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="video"
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: cameraOpen && !capturedImage ? "block" : "none",
                          }}
                        />
                        {capturedImage && (
                          <Box
                            component="img"
                            src={capturedImage}
                            alt="Captured live face"
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        )}
                        {!capturedImage && !cameraOpen && <XCircle color="#8ba1c4" />}
                      </Box>
                    </Box>
                    <Box>
                      <Typography fontWeight={900} color="#08295c" mb={1}>
                        Registered Photo
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          aspectRatio: "4 / 3",
                          background: "#ffffff",
                          border: "1px solid #dbe7ff",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {voter?.faceImage ? (
                          <Box
                            component="img"
                            src={voter.faceImage}
                            alt="Registered face"
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <XCircle color="#8ba1c4" />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3 }}>
                    <Button
                      variant="outlined"
                      disabled={!cameraOpen || loading}
                      onClick={captureFace}
                      sx={{ ...outlineButton }}
                    >
                      Capture Face
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<ShieldCheck size={18} />}
                      disabled={
                        loading ||
                        !capturedImage ||
                        !voter?.faceImage
                      }
                      onClick={verifyFace}
                      sx={{ ...primaryButton }}
                    >
                      {loading ? "Verifying..." : "Verify and Continue"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={checkApprovalStatus}
                      sx={{ ...outlineButton, borderColor: "#64748b", color: "#475569" }}
                    >
                      Check Approval Status
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}

export default Verification;
