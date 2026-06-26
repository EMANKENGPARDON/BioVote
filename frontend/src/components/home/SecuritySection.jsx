import {
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

function SecuritySection() {
  const features = [
    {
      image:
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=260&q=80",
      title: "Biometric Verification",
      description:
        "Identity verification using biometric authentication before voting.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=260&q=80",
      title: "Secure Voting",
      description:
        "Votes are protected against tampering and unauthorized access.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=260&q=80",
      title: "Real-Time Results",
      description:
        "Election results update instantly with complete transparency.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=260&q=80",
      title: "Double Voting Prevention",
      description:
        "Every voter can vote only once through unique verification.",
    },
  ];

  return (
    <Box
      sx={{
        mt: { xs: 10, md: 20 },
        px: { xs: 3, md: 5 },
        py: 10,
        background: "rgba(255,255,255,0.34)",
        borderRadius: "34px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        color="#11143f"
      >
        Why Choose BioVote?
      </Typography>

      <Typography
        textAlign="center"
        color="#64748b"
        sx={{
          mt: 2,
          mb: 6,
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        A modern electronic voting platform designed with security,
        transparency, and accessibility at its core.
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={6} lg={3} key={feature.title}>
            <motion.div whileHover={{ y: -10 }}>
              <Card
                className="brand-card"
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: "26px",
                  textAlign: "center",
                  transition: "all .4s ease",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 35px 60px rgba(50,57,183,0.18)",
                  },
                }}
              >
                <img
                  className="feature-photo"
                  src={feature.image}
                  alt={feature.title}
                />

                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {feature.title}
                </Typography>

                <Typography color="gray" mt={2}>
                  {feature.description}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SecuritySection;
