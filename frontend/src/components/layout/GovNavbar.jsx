import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/biovote-logo.png";
import { WORKFLOW_KEYS } from "../../utils/workflowSession";

function GovNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAdmin = pathname.startsWith("/admin/dashboard");
  const adminToken = localStorage.getItem(WORKFLOW_KEYS.adminToken);

  const handleLogout = () => {
    localStorage.removeItem(WORKFLOW_KEYS.adminToken);
    navigate("/admin/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#ffffff",
        color: "#0a2f6b",
        borderBottom: "1px solid #dbe7ff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ minHeight: 76, px: { xs: 0, sm: 2 }, gap: 2 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="BioVote logo"
              sx={{
                width: 46,
                height: 46,
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <Box>
              <Typography fontWeight={900} fontSize="1.25rem" lineHeight={1}>
                BioVote
              </Typography>
              <Typography
                fontSize="0.68rem"
                fontWeight={800}
                letterSpacing="0.08em"
                color="#5f759b"
                textTransform="uppercase"
              >
                Municipal Election Platform
              </Typography>
            </Box>
          </Box>

          {isAdmin && adminToken ? (
            <Button variant="outlined" onClick={handleLogout} sx={{ fontWeight: 800 }}>
              Logout
            </Button>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button component={Link} to="/register-voter" sx={{ fontWeight: 800 }}>
                Register
              </Button>
              <Button
                component={Link}
                to="/login-vote"
                variant="contained"
                sx={{
                  background: "#0f5bff",
                  fontWeight: 800,
                  "&:hover": { background: "#0a3cb5" },
                }}
              >
                Login to Vote
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default GovNavbar;
