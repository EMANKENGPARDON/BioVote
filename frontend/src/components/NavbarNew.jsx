import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/biovote-logo.png";

function Navbar() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Vote", to: "/vote" },
    { label: "Results", to: "/results" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.98)",
        borderBottom: "1px solid rgba(15, 91, 255, 0.08)",
        backdropFilter: "blur(12px)",
        zIndex: 1200,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            minHeight: 76,
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 900,
                fontSize: "1.2rem",
                boxShadow: "0 8px 20px rgba(15, 91, 255, 0.25)",
              }}
            >
              B
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  color: "#0f5bff",
                  lineHeight: 1,
                  fontSize: "1.3rem",
                }}
              >
                BioVote
              </Typography>
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Secure Voting
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
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
                      color: active ? "#0f5bff" : "#6b7280",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      fontSize: "0.95rem",
                      px: 2,
                      py: 0.8,
                      minWidth: 0,
                      borderBottom: active ? "3px solid #0f5bff" : "3px solid transparent",
                      borderRadius: 0,
                      transition: "all 0.3s ease",

                      "&:hover": {
                        color: "#0f5bff",
                        background: "rgba(15, 91, 255, 0.05)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              <Box sx={{ width: 1, borderRight: "1px solid #e5e7eb", mx: 1.5 }} />

              <Button
                component={Link}
                to="/admin"
                sx={{
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
                  color: "#ffffff",
                  textTransform: "capitalize",
                  fontWeight: 800,
                  px: 3,
                  py: 1,
                  fontSize: "0.95rem",
                  boxShadow: "0 8px 20px rgba(15, 91, 255, 0.25)",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    boxShadow: "0 12px 32px rgba(15, 91, 255, 0.35)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Admin Portal
              </Button>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <Button
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ minWidth: "auto", p: 0, color: "#0f5bff" }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </Toolbar>

        {/* Mobile Menu Items */}
        {isMobile && mobileOpen && (
          <Box
            sx={{
              pb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                fullWidth
                sx={{
                  color: "#0f5bff",
                  fontWeight: 700,
                  justifyContent: "flex-start",
                  textTransform: "capitalize",
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              component={Link}
              to="/admin"
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
                color: "white",
                fontWeight: 800,
                borderRadius: "8px",
                mt: 1,
              }}
            >
              Admin Portal
            </Button>
          </Box>
        )}
      </Container>
    </AppBar>
  );
}

export default Navbar;
