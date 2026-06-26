import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Vote, BarChart3, Lock } from "lucide-react";
import faceVerificationImage from "../../assets/face-verification-authentication.jfif";

function HeroSection() {
  const features = [
    {
      icon: (
        <Box
          component="img"
          src={faceVerificationImage}
          alt="Face verification authentication"
          sx={{
            width: 200,
            height: 200,
            borderRadius: "10px",
            objectFit: "cover",
            boxShadow: "0 8px 18px rgba(15, 91, 255, 0.18)",
          }}
        />
      ),
      title: "Biometric Security",
      desc: "Advanced face id verification verification",
    },
    {
      icon: <Vote size={32} />,
      title: "One Vote",
      desc: "Secure single-vote validation",
    },
    
    {
      icon: <Lock size={32} />,
      title: "Encrypted",
      desc: "Bank-grade end-to-end encryption",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Live Results",
      desc: "Real-time election tracking",
    },
  ];

  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 10 },
        px: 3,
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Background gradient elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "-20%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(15,91,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                background: "rgba(15, 91, 255, 0.1)",
                border: "1px solid rgba(15, 91, 255, 0.2)",
                borderRadius: "50px",
                px: 3,
                py: 1,
                mb: 3,
              }}
            >
              <Box
                component="img"
                src={faceVerificationImage}
                alt="Face verification authentication"
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(15, 91, 255, 0.18)",
                }}
              />
              <Typography sx={{ color: "#0f5bff", fontWeight: 700 }}>
                Trusted by Millions • Secure • Transparent
              </Typography>
            </Box>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: "#0a0e27",
              fontSize: { xs: "2.5rem", md: "3.8rem" },
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            The Future of <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #0f5bff 0%, #00d084 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Secure Voting
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: "600px",
              margin: "0 auto 1.5rem",
              color: "#6b7280",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.8,
              fontWeight: 500,
            }}
          >
            Experience transparent, secure, and accessible elections powered by biometric authentication and blockchain technology
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}
        >
          <Button
            component={Link}
            to="/register-voter"
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
              color: "#ffffff",
              fontWeight: 800,
              px: 4,
              py: 1.6,
              fontSize: "1rem",
              boxShadow: "0 12px 32px rgba(15, 91, 255, 0.3)",
              transition: "all 0.3s ease",
              textTransform: "capitalize",

              "&:hover": {
                boxShadow: "0 16px 48px rgba(15, 91, 255, 0.4)",
                transform: "translateY(-4px)",
              },
            }}
          >
            Register to Vote
          </Button>

          <Button
            component={Link}
            to="/results"
            sx={{
              borderRadius: "10px",
              border: "2px solid #0f5bff",
              color: "#0f5bff",
              fontWeight: 800,
              px: 4,
              py: 1.6,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              textTransform: "capitalize",
              background: "rgba(15, 91, 255, 0.05)",

              "&:hover": {
                background: "rgba(15, 91, 255, 0.1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            View Results
          </Button>
        </motion.div>

        {/* Feature Cards */}
        <Grid container spacing={2.5} sx={{ mt: 2 }}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid #e5e7ff",
                    background: "rgba(255, 255, 255, 0.7)",
                    boxShadow: "0 4px 12px rgba(15, 91, 255, 0.08)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "all 0.3s ease",

                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(15, 91, 255, 0.15)",
                      transform: "translateY(-8px)",
                      border: "1px solid rgba(15, 91, 255, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "#0f5bff",
                      mb: 1.5,
                      display: "flex",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography fontWeight={700} color="#0a0e27" mb={0.5}>
                    {feature.title}
                  </Typography>
                  <Typography color="#9ca3af" fontSize="0.9rem">
                    {feature.desc}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}

export default HeroSection;
