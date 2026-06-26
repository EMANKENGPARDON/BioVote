import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import {
  Alert,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Trophy } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = ["#0f5bff", "#12a150", "#f59e0b", "#7c3aed", "#ef4444"];

function Results() {
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [election, setElection] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const [electionResponse, resultsResponse, votersResponse] = await Promise.all([
          API.get("/admin/election-status"),
          API.get("/candidates/results").catch(() => ({ data: [] })),
          API.get("/voters"),
        ]);
        setElection(electionResponse.data);
        setCandidates(resultsResponse.data);
        setVoters(votersResponse.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Results unavailable until election closes");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const totalVotes = useMemo(
    () => candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0),
    [candidates]
  );
  const sortedCandidates = useMemo(
    () => [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0)),
    [candidates]
  );
  const winner = sortedCandidates[0];
  const turnout = useMemo(
    () => (voters.length > 0 ? ((totalVotes / voters.length) * 100).toFixed(1) : 0),
    [totalVotes, voters.length]
  );
  const chartData = useMemo(
    () => sortedCandidates.map((c) => ({ name: c.fullName, votes: c.voteCount || 0 })),
    [sortedCandidates]
  );

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f8ff", px: 2, py: { xs: 6, md: 9 } }}>
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>
        <Typography component="h1" fontSize="2.4rem" fontWeight={900} color="#08295c">
          Official Election Results
        </Typography>
        <Typography color="#506784" mt={1} mb={4}>
          Results are published only after the election is closed by the administrator.
        </Typography>

        {loading && <LinearProgress sx={{ mb: 3 }} />}

        {election?.status !== "Closed" && !loading ? (
          <Alert severity="info" sx={{ maxWidth: 760 }}>
            {message || "Results unavailable until election closes"}
          </Alert>
        ) : (
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
                gap: 2,
              }}
            >
              {[
                ["Registered Voters", voters.length],
                ["Votes Cast", totalVotes],
                ["Turnout", `${turnout}%`],
                ["Winner", winner?.fullName || "No winner"],
              ].map(([label, value]) => (
                <Card key={label} sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
                  <CardContent>
                    <Typography color="#506784" fontWeight={800}>
                      {label}
                    </Typography>
                    <Typography color="#08295c" fontWeight={900} fontSize="1.6rem">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Card sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
                <CardContent>
                  <Typography fontWeight={900} color="#08295c" mb={2}>
                    Vote Count Bar Chart
                  </Typography>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="votes" fill="#0f5bff" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
                <CardContent>
                  <Typography fontWeight={900} color="#08295c" mb={2}>
                    Vote Share Pie Chart
                  </Typography>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={chartData} dataKey="votes" nameKey="name" outerRadius={100} label>
                        {chartData.map((entry, index) => (
                          <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {sortedCandidates.map((candidate, index) => {
              const percentage = totalVotes > 0 ? (candidate.voteCount / totalVotes) * 100 : 0;

              return (
                <Card key={candidate._id} sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "auto 1fr auto" },
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "12px",
                          background: index === 0 ? "#0f5bff" : "#dbe7ff",
                          color: index === 0 ? "#fff" : "#08295c",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                        }}
                      >
                        {index === 0 ? <Trophy size={22} /> : index + 1}
                      </Box>
                      <Box>
                        <Typography fontWeight={900} color="#08295c">
                          {candidate.fullName}
                        </Typography>
                        <Typography color="#506784">
                          {candidate.politicalParty} - {candidate.municipality}
                        </Typography>
                      </Box>
                      <Typography fontWeight={900} color="#08295c">
                        {candidate.voteCount || 0} votes
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{ mt: 2, height: 8, borderRadius: 99 }}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Results;
