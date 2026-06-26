import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { CalendarClock, ShieldCheck } from "lucide-react";
import API from "../services/api";
import { WORKFLOW_KEYS } from "../utils/workflowSession";

function ElectionStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState(location.state?.election || null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkElection = async () => {
      try {
        const response = await API.get("/admin/election-status");
        setElection(response.data);
        if (!response.data || response.data.status !== "Active") {
          setMessage("No active elections currently. Please return when voting opens.");
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Unable to check election status.");
      } finally {
        setLoading(false);
      }
    };

    checkElection();
  }, []);

  const nationalId = localStorage.getItem(WORKFLOW_KEYS.registeredNationalId);
  const active = election?.status === "Active";

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f8ff", px: 2, py: { xs: 6, md: 9 } }}>
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
              {loading ? (
                <>
                  <CircularProgress />
                  <Typography mt={3} color="#506784" fontWeight={700}>
                    Checking election status...
                  </Typography>
                </>
              ) : active ? (
                <>
                  <ShieldCheck size={64} color="#0f5bff" />
                  <Typography component="h1" fontSize="2rem" fontWeight={900} color="#08295c" mt={2}>
                    Election is Active
                  </Typography>
                  <Typography color="#506784" mt={1} mb={3}>
                    {election.title} is open for {election.municipality}. Continue to biometric verification.
                  </Typography>
                  <Alert severity="info" sx={{ mb: 3, textAlign: "left" }}>
                    National ID for this session: {nationalId}
                  </Alert>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/verification")}
                    sx={{ borderRadius: "10px", px: 4, fontWeight: 900, textTransform: "none" }}
                  >
                    Continue to Biometric Verification
                  </Button>
                </>
              ) : (
                <>
                  <CalendarClock size={64} color="#0f5bff" />
                  <Typography component="h1" fontSize="2rem" fontWeight={900} color="#08295c" mt={2}>
                    Voting Not Open
                  </Typography>
                  <Typography color="#506784" mt={1} mb={3}>
                    {message}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                    sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
                  >
                    Return to Landing Page
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
}

export default ElectionStatus;
