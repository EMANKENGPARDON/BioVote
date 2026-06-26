import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../../assets/biovote-logo.png";

function HeroSection() {
  return (
    <Box
      sx={{
        textAlign: "center",
        pt: { xs: 13, md: 15 },
        px: 3,
        position: "relative",
        zIndex: 2,
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <img
          src={logo}
          alt="BioVote"
          style={{
            width: "132px",
            height: "132px",
            objectFit: "cover",
            borderRadius: "34px",
            marginBottom: "22px",
            boxShadow: "0 22px 58px rgba(50,57,183,0.22)",
          }}
        />

        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: "#11143f",
            fontSize: { xs: "3rem", md: "5rem" },
            lineHeight: 0.95,
          }}
        >
          BioVote
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 1.5,
            color: "#11143f",
            fontWeight: 900,
            fontSize: { xs: "1.8rem", md: "2.6rem" },
          }}
        >
          Online Voting System
        </Typography>

        <Typography
          sx={{
            maxWidth: "650px",
            margin: "18px auto",
            color: "#4f5675",
            fontSize: { xs: "16px", md: "18px" },
            lineHeight: 1.7,
          }}
        >
          A web-based platform that enables voters to cast their ballots
          electronically from anywhere, at any time.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          <Button
            component={Link}
            to="/register-voter"
            variant="contained"
            size="large"
            sx={{
              borderRadius: "999px",
              px: 4,
              background: "#3239b7",
              fontWeight: 900,
              textTransform: "none",
              boxShadow: "0 16px 34px rgba(50,57,183,0.26)",
            }}
          >
            Register as a Voter
          </Button>

          <Button
            component={Link}
            to="/results"
            variant="outlined"
            size="large"
            sx={{
              borderRadius: "999px",
              px: 4,
              borderColor: "rgba(50,57,183,0.34)",
              color: "#232755",
              fontWeight: 900,
              textTransform: "none",
              background: "rgba(255,255,255,0.56)",
            }}
          >
            Live Results
          </Button>
        </Box>

      </motion.div>
    </Box>
  );
}

export default HeroSection;
