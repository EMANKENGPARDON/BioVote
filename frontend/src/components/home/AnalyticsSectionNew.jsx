import {
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../services/api";
import { Users, Vote, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function AnalyticsSectionNew() {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const votersResponse = await API.get("/voters");
      const candidatesResponse = await API.get("/candidates");
      setVoters(votersResponse.data);
      setCandidates(candidatesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + (candidate.voteCount || 0),
    0
  );

  const turnout = voters.length > 0 ? (((totalVotes / voters.length) * 100).toFixed(1)) : 0;

  const stats = [
    {
      icon: <Users size={28} />,
      label: "Registered Voters",
      value: voters.length,
      color: "#0f5bff",
    },
    {
      icon: <Vote size={28} />,
      label: "Active Candidates",
      value: candidates.length,
      color: "#00d084",
    },
    {
      icon: <TrendingUp size={28} />,
      label: "Voter Turnout",
      value: `${turnout}%`,
      color: "#f59e0b",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: 3,
        background: "linear-gradient(135deg, #f0f3ff 0%, #ffffff 100%)",
      }}
    >
      <Box sx={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 900,
              color: "#0a0e27",
              mb: 2,
            }}
          >
            Live Election <span style={{ color: "#0f5bff" }}>Analytics</span>
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 3rem",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            Real-time monitoring of voter participation and election progress with complete transparency and security
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card
                  sx={{
                    p: 4,
                    borderRadius: "16px",
                    border: "1px solid #e5e7ff",
                    background: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 12px rgba(15, 91, 255, 0.08)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,

                    "&:hover": {
                      boxShadow: "0 16px 32px rgba(15, 91, 255, 0.15)",
                      transform: "translateY(-8px)",
                      borderColor: stat.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "12px",
                      background: `rgba(15, 91, 255, 0.1)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        color: "#0a0e27",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography color="#6b7280" fontWeight={600} mt={0.5}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AnalyticsSectionNew;
