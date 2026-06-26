import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/biovote-logo.png";

function CTASection() {
  return (
    <Box
      className="brand-card"
      sx={{
        textAlign: "center",
        mt: 15,
        mb: 10,
        mx: "auto",
        px: 3,
        py: 7,
        width: "min(980px, calc(100% - 32px))",
      }}
    >
      <img
        className="brand-logo-mark"
        src={logo}
        alt="BioVote logo"
        style={{ marginBottom: 18 }}
      />

      <Typography
        variant="h2"
        fontWeight="bold"
        color="#11143f"
        sx={{ fontSize: { xs: "2.3rem", md: "3.6rem" } }}
      >
        Ready to Transform Voting?
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color: "#64748b",
          fontSize: "18px",
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        Secure, transparent and biometric
        election management for municipalities.
      </Typography>

      <Button
        component={Link}
        to="/verification"
        variant="contained"
        size="large"
        sx={{
          mt: 4,
          borderRadius: "999px",
          px: 5,
          py: 2,
          background:
            "linear-gradient(90deg,#11143f,#3239b7)",
          textTransform: "none",
          fontWeight: 900,
        }}
      >
        Verify and Vote
      </Button>
    </Box>
  );
}

export default CTASection;
