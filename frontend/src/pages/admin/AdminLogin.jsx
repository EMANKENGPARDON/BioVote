import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { WORKFLOW_KEYS } from "../../utils/workflowSession";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const login = async () => {
    try {
      setError("");
      const response = await API.post("/admin/login", form);
      localStorage.setItem(WORKFLOW_KEYS.adminToken, response.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid admin credentials");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f8ff", px: 2, py: { xs: 6, md: 9 } }}>
      <Card sx={{ maxWidth: 520, mx: "auto", borderRadius: "14px", border: "1px solid #dbe7ff" }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography component="h1" fontSize="2rem" fontWeight={900} color="#08295c">
            Admin Login
          </Typography>
          <Typography color="#506784" mt={1} mb={3}>
            Authorized election officials only.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            fullWidth
            label="Username"
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={login}
            sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminLogin;
