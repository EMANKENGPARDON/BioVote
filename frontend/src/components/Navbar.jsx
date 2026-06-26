import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/biovote-logo.png";

function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Admin", to: "/admin" },
    { label: "Voters", to: "/register-voter" },
    { label: "Candidates", to: "/register-candidate" },
    { label: "Vote", to: "/vote" },
    { label: "Results", to: "/results" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.82)",
        borderBottom: "1px solid rgba(255,255,255,0.72)",
        boxShadow: "0 16px 40px rgba(50,58,138,0.12)",
        backdropFilter: "blur(22px)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          minHeight: { xs: 76, md: 82 },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="BioVote Logo"
            style={{
              width: "58px",
              height: "58px",
              objectFit: "cover",
              borderRadius: "18px",
            }}
          />

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "#11143f",
                lineHeight: 1,
              }}
            >
              BioVote
            </Typography>
            <Typography
              sx={{
                color: "#6a7090",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Online Voting System
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 0.75,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {navItems.map((item) => {
            const active = pathname === item.to;

            return (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                sx={{
                  color: active ? "#ffffff" : "#232755",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "999px",
                  px: { xs: 1.2, md: 2 },
                  py: 0.9,
                  minWidth: 0,
                  backgroundColor: active
                    ? "#3239b7"
                    : "transparent",

                  "&:hover": {
                    color: active ? "#ffffff" : "#3239b7",
                    backgroundColor: active
                      ? "#262d98"
                      : "rgba(50,57,183,0.08)",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}

          <Button
            component={Link}
            to="/verification"
            variant="contained"
            sx={{
              borderRadius: "999px",
              backgroundColor: "#11143f",
              textTransform: "none",
              fontWeight: 900,
              px: { xs: 1.5, md: 3 },
              py: 0.9,
              boxShadow: "0 12px 28px rgba(17,20,63,0.22)",

              "&:hover": {
                backgroundColor: "#3239b7",
              },
            }}
          >
            Verify
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
