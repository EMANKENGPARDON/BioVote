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
import {
  BadgeCheck,
  Fingerprint,
  Hash,
  Link2,
  Mail,
  MapPin,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import faceImage from "../assets/face-verification-authentication.jfif";

function Home() {
  const securityFeatures = [
    { icon: <UserCheck size={20} />, label: "Unique voter identification" },
    { icon: <Mail size={20} />, label: "Email-based login" },
    { icon: <Fingerprint size={20} />, label: "Facial recognition" },
    { icon: <BadgeCheck size={20} />, label: "One-vote enforcement" },
    { icon: <Hash size={20} />, label: "SHA-256 hashing" },
    { icon: <Link2 size={20} />, label: "Linked blockchain audit logs" },
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              borderRadius: "16px",
              border: "1px solid #dbe7ff",
              background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
              color: "#fff",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <ShieldCheck size={32} />
              <Typography fontWeight={900} fontSize="1.3rem" mt={2}>
                Results are intentionally delayed
              </Typography>
              <Typography sx={{ opacity: 0.9, mt: 1, lineHeight: 1.8 }}>
                Public results become available only after an administrator closes
                the election, protecting the integrity of the vote until it ends.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: "16px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography fontWeight={900} color="#08295c" fontSize="1.3rem" mb={2.5}>
                Security Features
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2,
                }}
              >
                {securityFeatures.map((feature) => (
                  <Box
                    key={feature.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: "10px",
                      background: "#f4f8ff",
                      border: "1px solid #e6eeff",
                    }}
                  >
                    <Box
                      sx={{
                        color: "#0f5bff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 34,
                        height: 34,
                        borderRadius: "8px",
                        background: "#e6eeff",
                        flexShrink: 0,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography color="#334467" fontWeight={600} fontSize="0.9rem">
                      {feature.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ mt: 3, borderRadius: "16px", border: "1px solid #dbe7ff" }}>
          <CardContent
            sx={{
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2.5,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <MapPin color="#0f5bff" size={20} />
              <Typography color="#334467" fontWeight={600}>
                Municipal Election Office
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Mail color="#0f5bff" size={20} />
              <Typography color="#334467" fontWeight={600}>
                support@biovote.local
              </Typography>
            </Box>
            <Box
              component={Link}
              to="/admin/login"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#0f5bff",
                fontWeight: 900,
                textDecoration: "none",
              }}
            >
              Election Administrator Login →
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Home;
