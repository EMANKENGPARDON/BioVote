import { Box, Typography } from "@mui/material";
import logo from "../assets/biovote-logo.png";

function BrandHeader({ title, subtitle, action }) {
  return (
    <Box
      className="brand-card"
      sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        gap: 3,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2.25 }}>
        <img className="brand-logo-mark" src={logo} alt="BioVote logo" />

        <Box>
          <Typography
            variant="overline"
            sx={{
              color: "#5b62c8",
              fontWeight: 800,
              letterSpacing: 1.4,
            }}
          >
            BioVote
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "#11143f",
              fontWeight: 900,
              lineHeight: 1.05,
              fontSize: { xs: "2rem", md: "2.8rem" },
            }}
          >
            {title}
          </Typography>

          <Typography sx={{ color: "#58607d", mt: 1, maxWidth: 680 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {action}
    </Box>
  );
}

export default BrandHeader;
