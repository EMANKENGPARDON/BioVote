import { Box, Typography } from "@mui/material";
import logo from "../../assets/biovote-logo.png";

function FooterSection() {
  return (
    <Box
      sx={{
        mt: 15,
        py: 6,
        background: "linear-gradient(135deg,#11143f,#252c9a,#6d76de)",
        color: "white",
        textAlign: "center",
        borderTopLeftRadius: "34px",
        borderTopRightRadius: "34px",
      }}
    >
      <img
        src={logo}
        alt="BioVote logo"
        style={{
          width: 76,
          height: 76,
          objectFit: "cover",
          borderRadius: 22,
          marginBottom: 14,
        }}
      />

      <Typography variant="h4" fontWeight="bold">
        BioVote
      </Typography>

      <Typography sx={{ mt: 2, color: "#e5e7ff" }}>
        Online Voting System
      </Typography>

      <Typography sx={{ mt: 3, color: "#c7ccff" }}>
        Copyright 2026 BioVote. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default FooterSection;
