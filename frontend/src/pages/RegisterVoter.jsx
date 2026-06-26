import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, CheckCircle } from "lucide-react";
import { WORKFLOW_KEYS, saveJson } from "../utils/workflowSession";

function RegisterVoter() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    email: "",
    phoneNumber: "",
    municipality: "",
    faceImage: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#dbeef0",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0f23d3",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#0f5bff",
        borderWidth: "2px",
      },
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      setErrorMsg("");
    } catch {
      setErrorMsg("Camera access was denied or unavailable.");
    }
  };

  const captureFace = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
      setErrorMsg("Camera is still starting. Wait a moment, then capture again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");
    setPreviewImage(image);
    setFormData((prev) => ({
      ...prev,
      faceImage: image,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setSuccess("");
      setErrorMsg("");

      const response = await API.post("/voters/register", formData);

      console.log(response.data);

      const registeredVoter = response.data.voter || response.data;
      localStorage.setItem(WORKFLOW_KEYS.registeredNationalId, registeredVoter.nationalId);
      saveJson("biovote-registered-voter", registeredVoter);

      setSuccess("Registration Successful. You may now log in and participate in elections when voting is active.");

      setFormData({
        fullName: "",
        nationalId: "",
        email: "",
        phoneNumber: "",
        municipality: "",
        faceImage: "",
      });

      setPreviewImage(null);
      setTimeout(() => navigate("/login-vote"), 900);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbe5fa 0%, #dde3fa 100%)",
        pt: { xs: 13, md: 15 },
        pb: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "760px", mx: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: "center" }}>
            <Typography
              component="h1"
              sx={{
                fontWeight: 900,
                color: "#293bb1",
                fontSize: { xs: "2rem", md: "2.7rem" },
                lineHeight: 1.12,
                mb: 1,
              }}
            >
              Voter Registration
            </Typography>
            <Typography color="#6b7280" sx={{ fontSize: "1rem" }}>
              Register to participate in secure elections.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card
            sx={{
              borderRadius: "12px",
              border: "1px solid #717be9",
              
              boxShadow: "0 18px 48px rgba(15, 91, 255, 0.12)",
              overflow: "hidden",
              backgroundColor: "rgba(201, 201, 252, 0.98)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert
                    icon={<CheckCircle size={20} />}
                    severity="success"
                    sx={{
                      mb: 3,
                      borderRadius: "12px",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      borderColor: "#10b981",
                      color: "#047857",
                      fontWeight: 600,
                    }}
                  >
                    {success}
                  </Alert>
                </motion.div>
              )}

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: "12px",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      borderColor: "#ef4444",
                      color: "#b91c1c",
                      fontWeight: 600,
                    }}
                  >
                    {errorMsg}
                  </Alert>
                </motion.div>
              )}

              <Box
                sx={{
                  display: "grid",
                  gap: { xs: 2.25, sm: 2.5 },
                  alignItems: "start",
                }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="National ID"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  placeholder="Enter your national ID"
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  label="Municipality"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  placeholder="Select your municipality"
                  sx={inputStyles}
                />

                <Box
                  sx={{
                    gridColumn: "1 / -1",
                    mt: 0.5,
                    p: { xs: 2, sm: 2.5 },
                    border: "1px solid #bdc0e9",
                    borderRadius: "14px",
                    background: "#bac7ec",
                  }}
                >
                  <Typography fontWeight={800} mb={1.5} color="#0a0e27">
                    Capture Facial Image
                  </Typography>

                  <Box
                    component="video"
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    sx={{
                      width: "100%",
                      maxHeight: 280,
                      background: "#dbe7ff",
                      borderRadius: "12px",
                      objectFit: "cover",
                      mb: 2,
                      display: cameraOpen ? "block" : "none",
                    }}
                  />

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Camera size={20} />}
                    onClick={cameraOpen ? captureFace : openCamera}
                    sx={{
                      py: 1.7,
                      borderRadius: "12px",
                      borderColor: "#0f5bff",
                      borderWidth: "2px",
                      color: "#0f5bff",
                      fontWeight: 800,
                      textTransform: "capitalize",
                      background: "rgba(15, 91, 255, 0.03)",
                      transition: "all 0.3s ease",

                      "&:hover": {
                        background: "rgba(15, 91, 255, 0.08)",
                        borderColor: "#0a3cb5",
                      },
                    }}
                  >
                    {cameraOpen ? "Capture Face" : "Open Camera"}
                  </Button>

                  {previewImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ mt: 3, textAlign: "center" }}>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "14px",
                            border: "3px solid #8aa6e2",
                            boxShadow: "0 8px 24px rgba(15, 91, 255, 0.15)",
                          }}
                        />
                        <Typography color="#0ea170" fontWeight={700} mt={1.5}>
                          Photo uploaded successfully
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </Box>

                <Box sx={{ gridColumn: "1 / -1" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 5,
                      py: 1.5,
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
                      color: "#f5ecec",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      fontSize: "1rem",
                      boxShadow: "0 12px 32px rgba(15, 91, 255, 0.3)",
                      transition: "all 0.3s ease",

                      "&:hover:not(:disabled)": {
                        boxShadow: "0 16px 48px rgba(15, 91, 255, 0.4)",
                        transform: "translateY(-2px)",
                      },

                      "&:disabled": {
                        opacity: 0.7,
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    {loading ? "Registering..." : "Register as Voter"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}

export default RegisterVoter;
