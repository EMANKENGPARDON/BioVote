import {
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Heart, Award } from "lucide-react";

function EducationSectionNew() {
  const educationCards = [
    {
      icon: <BookOpen size={32} />,
      title: "How BioVote Works",
      description: "Secure voting using biometric authentication. Your identity is verified through facial recognition and fingerprint scanning for complete security.",
      color: "#0f5bff",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Why Verify Identity",
      description: "Identity verification prevents voter fraud and ensures that each person votes only once. It's the cornerstone of free and fair elections.",
      color: "#00d084",
    },
    {
      icon: <Heart size={32} />,
      title: "Your Voting Rights",
      description: "Every eligible voter has the fundamental right to participate. BioVote protects your rights with transparency and accessibility for all.",
      color: "#f59e0b",
    },
    {
      icon: <Award size={32} />,
      title: "What To Expect",
      description: "Quick registration, secure verification, and instant vote recording. The entire process is streamlined for accessibility and peace of mind.",
      color: "#ef4444",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f0f3ff 100%)",
      }}
    >
      <Box sx={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 900,
              color: "#0a0e27",
              mb: 2,
            }}
          >
            Learn About <span style={{ color: "#0f5bff" }}>Voting</span>
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 3rem",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            Understand the importance of secure voting and how BioVote revolutionizes the election process
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {educationCards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3.5,
                    borderRadius: "16px",
                    border: "1px solid #e5e7ff",
                    background: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 12px rgba(15, 91, 255, 0.08)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,

                    "&:hover": {
                      boxShadow: "0 16px 40px rgba(15, 91, 255, 0.15)",
                      transform: "translateY(-10px)",
                      borderColor: card.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "12px",
                      background: `rgba(${parseInt(card.color.slice(1, 3), 16)}, ${parseInt(card.color.slice(3, 5), 16)}, ${parseInt(card.color.slice(5, 7), 16)}, 0.1)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>

                  <Typography fontWeight={800} color="#0a0e27" fontSize="1.1rem">
                    {card.title}
                  </Typography>

                  <Typography color="#6b7280" fontSize="0.95rem" lineHeight={1.6}>
                    {card.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default EducationSectionNew;
