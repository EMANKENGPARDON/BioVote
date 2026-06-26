import { useState } from "react";
import API from "../services/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { Upload, CheckCircle } from "lucide-react";

function RegisterCandidate() {
  const [formData, setFormData] = useState({
    fullName: "",
    politicalParty: "",
    position: "",
    municipality: "",
    manifesto: "",
    photo: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setSuccess("");
      setErrorMsg("");

      const response = await API.post("/candidates", formData);

      setSuccess("Candidate registered successfully!");

      console.log(response.data);

      setFormData({
        fullName: "",
        politicalParty: "",
        position: "",
        municipality: "",
        manifesto: "",
        photo: "",
      });

      setPreviewImage(null);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f3ff 0%, #fafbff 100%)", py: 6 }}>
      <Box sx={{ maxWidth: "800px", mx: "auto", px: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#0a0e27",
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 1,
              }}
            >
              Candidate Registration
            </Typography>
            <Typography color="#6b7280" sx={{ fontSize: "1rem" }}>
              Register to run for office and participate in secure municipal elections
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
              borderRadius: "20px",
              border: "1px solid #e5e7ff",
              boxShadow: "0 10px 35px rgba(15, 91, 255, 0.08)",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
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

              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter candidate name"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#0f5bff",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Political Party"
                    name="politicalParty"
                    value={formData.politicalParty}
                    onChange={handleChange}
                    placeholder="Party name"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#0f5bff",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="E.g., Mayor, Councilor"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#0f5bff",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Municipality"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    placeholder="City/Municipality"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#0f5bff",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Campaign Manifesto"
                    name="manifesto"
                    value={formData.manifesto}
                    onChange={handleChange}
                    placeholder="Describe your vision and campaign platform..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#0f5bff",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mt: 1 }}>
                    <Typography fontWeight={800} mb={2} color="#0a0e27">
                      Upload Campaign Photo
                    </Typography>

                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<Upload size={20} />}
                      sx={{
                        py: 2,
                        borderRadius: "10px",
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
                      Upload Photo

                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                      />
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
                              width: "140px",
                              height: "140px",
                              objectFit: "cover",
                              borderRadius: "14px",
                              border: "3px solid #0f5bff",
                              boxShadow: "0 8px 24px rgba(15, 91, 255, 0.15)",
                            }}
                          />
                          <Typography color="#10b981" fontWeight={700} mt={1.5}>
                            ✓ Photo uploaded successfully
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      py: 1.8,
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
                      color: "#ffffff",
                      textTransform: "capitalize",
                      fontWeight: 900,
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
                    {loading ? "Registering..." : "Register as Candidate"}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}

export default RegisterCandidate;
