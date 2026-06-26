import { Box, Typography } from "@mui/material";
import logo from "../assets/biovote-logo.png";

function SplashScreen({ onDone }) {
  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "radial-gradient(circle at 50% 18%, rgba(182, 184, 204, 0.5), transparent 24%), linear-gradient(135deg,#cdd2ff,#f7f7ff 46%,#aeb6f5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#11143f",
        textAlign: "center",
        px: 3,
      }}
    >
      <img
        src={logo}
        alt="BioVote Logo"
        style={{
          width: "170px",
          borderRadius: "30px",
          marginBottom: "20px",
          boxShadow: "0 24px 70px rgba(50,57,183,0.24)",
          animation: "pulse 2s infinite",
        }}
      />

      <Typography variant="h2" fontWeight="bold">
        BioVote
      </Typography>

      <Typography
        variant="h6"
        sx={{ mt: 1, color: "#2b0591", fontWeight: 700 }}
      >
        Online Voting System
      </Typography>

      <Box
        sx={{
          width: "250px",
          height: "8px",
          background: "rgba(183, 159, 50, 0.14)",
          borderRadius: "20px",
          overflow: "hidden",
          mt: 4,
        }}
      >
        <Box
          onAnimationEnd={onDone}
          sx={{
            height: "100%",
            background: "rgb(6, 9, 75)",
            animation: "loading 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        />
      </Box>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }

          @keyframes loading {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </Box>
  );
}

export default SplashScreen;
