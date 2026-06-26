import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Camera, Database, FileCheck2, ShieldCheck } from "lucide-react";
import logo from "../assets/biovote-logo.png";
import faceImage from "../assets/face-verification-authentication.jfif";

function Home() {
  const steps = [
    {
      icon: <FileCheck2 size={26} />,
      title: "Register",
      text: "Eligible residents submit identity details and a face image.",
    },
    {
      icon: <Camera size={26} />,
      title: "Verify",
      text: "Face recognition confirms the voter before ballot access.",
    },
    {
      icon: <BadgeCheck size={26} />,
      title: "Vote Once",
      text: "The platform prevents duplicate voting through voter status checks.",
    },
    {
      icon: <Database size={26} />,
      title: "Audit",
      text: "Each vote creates a blockchain audit record for transparency.",
    },
  ];

  return (
    <Box sx={{ background: "#f4f8ff", minHeight: "100vh" }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #eef5ff 100%)",
          borderBottom: "1px solid #dbe7ff",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
              gap: { xs: 5, md: 8 },
              alignItems: "center",
            }}
          >
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="BioVote logo"
                  sx={{ width: 58, height: 58, borderRadius: "14px", objectFit: "cover" }}
                />
                <Box>
                  <Typography color="#0f5bff" fontWeight={900} fontSize="1.1rem">
                    BioVote Municipal Elections
                  </Typography>
                  <Typography color="#5f759b" fontWeight={700} fontSize="0.85rem">
                    Secure public voting and audit management
                  </Typography>
                </Box>
              </Box>

              <Typography
                component="h1"
                sx={{
                  color: "#08295c",
                  fontWeight: 900,
                  fontSize: { xs: "2.4rem", md: "4rem" },
                  lineHeight: 1.05,
                  mb: 2.5,
                }}
              >
                Trusted digital voting for municipal elections
              </Typography>

              <Typography
                sx={{
                  color: "#506784",
                  fontSize: { xs: "1rem", md: "1.12rem" },
                  lineHeight: 1.8,
                  maxWidth: 650,
                  mb: 4,
                }}
              >
                BioVote helps municipalities register voters, verify identity,
                protect each ballot, and maintain a transparent blockchain audit
                trail without exposing live results before election closure.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  to="/register-voter"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: "10px",
                    px: 4,
                    py: 1.5,
                    background: "#0f5bff",
                    fontWeight: 900,
                    textTransform: "none",
                    "&:hover": { background: "#0a3cb5" },
                  }}
                >
                  Register as Voter
                </Button>
                <Button
                  component={Link}
                  to="/login-vote"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: "10px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 900,
                    textTransform: "none",
                    borderColor: "#0f5bff",
                    color: "#0f5bff",
                  }}
                >
                  Login to Vote
                </Button>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Box
                component="img"
                src={faceImage}
                alt="Face verification authentication"
                sx={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 24px 60px rgba(15, 91, 255, 0.18)",
                  border: "1px solid #dbe7ff",
                }}
              />
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ mb: 5 }}>
          <Typography component="h2" fontWeight={900} color="#08295c" fontSize="2rem">
            About BioVote
          </Typography>
          <Typography color="#506784" sx={{ maxWidth: 850, mt: 1.5, lineHeight: 1.8 }}>
            BioVote is a final year project designed as a professional municipal
            election management system. It combines voter registration, biometric
            authentication, controlled election status, vote recording, analytics,
            and blockchain logs in one workflow.
          </Typography>
        </Box>

        <Typography component="h2" fontWeight={900} color="#08295c" fontSize="2rem" mb={3}>
          How It Works
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2.5,
          }}
        >
          {steps.map((step) => (
            <Card key={step.title} sx={{ border: "1px solid #dbe7ff", borderRadius: "12px" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ color: "#0f5bff", mb: 2 }}>{step.icon}</Box>
                <Typography fontWeight={900} color="#08295c" mb={1}>
                  {step.title}
                </Typography>
                <Typography color="#5f759b" fontSize="0.95rem" lineHeight={1.7}>
                  {step.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card sx={{ mt: 5, borderRadius: "12px", border: "1px solid #dbe7ff" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 }, display: "flex", gap: 2 }}>
            <ShieldCheck color="#0f5bff" />
            <Box>
              <Typography fontWeight={900} color="#08295c">
                Results are intentionally delayed
              </Typography>
              <Typography color="#506784" mt={0.5}>
                Public results become available only after an administrator closes
                the election.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mt: 3, borderRadius: "12px", border: "1px solid #dbe7ff" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography fontWeight={900} color="#08295c" fontSize="1.5rem">
              Security Features
            </Typography>
            <Typography color="#506784" mt={1} lineHeight={1.8}>
              Unique voter identification, email-based login, facial recognition,
              one-vote enforcement, SHA256 hashing, and linked blockchain audit logs.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mt: 3, borderRadius: "12px", border: "1px solid #dbe7ff" }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography fontWeight={900} color="#08295c" fontSize="1.5rem">
              Contact Information
            </Typography>
            <Typography color="#506784" mt={1} lineHeight={1.8}>
              Municipal Election Office | support@biovote.local | Admin access:
              {" "}
              <Box component={Link} to="/admin/login" sx={{ color: "#0f5bff", fontWeight: 900 }}>
                Election Administrator Login
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Home;
