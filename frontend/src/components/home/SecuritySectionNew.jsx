import {
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Lock, Zap, Eye, Shield } from "lucide-react";

function SecuritySectionNew() {
  const securityFeatures = [
    {
      icon: <Lock size={36} />,
      title: "End-to-End Encryption",
      desc: "Military-grade encryption protects your vote from submission to storage with zero-knowledge verification.",
      color: "#0f5bff",
    },
    {
      icon: <Zap size={36} />,
      title: "Biometric Verification",
      desc: "Advanced facial recognition and fingerprint scanning ensure only authorized voters can participate.",
      color: "#00d084",
    },
    {
      icon: <Eye size={36} />,
      title: "Real-time Monitoring",
      desc: "Live audit trails and transparency logs allow election observers to verify integrity in real-time.",
      color: "#f59e0b",
    },
    {
      icon: <Shield size={36} />,
      title: "Tamper Detection",
      desc: "Blockchain-backed verification prevents any unauthorized changes to vote counts or election data.",
      color: "#ef4444",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: 3,
        background: "linear-gradient(135deg, #f0f3ff 0%, #e8ebff 100%)",
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
            Security You Can <span style={{ color: "#0f5bff" }}>Trust</span>
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
            Enterprise-grade security infrastructure with certified compliance and continuous protection
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {securityFeatures.map((feature, idx) => (
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
                      borderColor: feature.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "12px",
                      background: `rgba(${parseInt(feature.color.slice(1, 3), 16)}, ${parseInt(feature.color.slice(3, 5), 16)}, ${parseInt(feature.color.slice(5, 7), 16)}, 0.1)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography fontWeight={800} color="#0a0e27" fontSize="1.1rem">
                    {feature.title}
                  </Typography>

                  <Typography color="#6b7280" fontSize="0.95rem" lineHeight={1.6}>
                    {feature.desc}
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

export default SecuritySectionNew;
