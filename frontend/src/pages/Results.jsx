import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Circle } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CHART_COLORS = ["#0f5bff", "#35b864", "#f5b51b", "#7c3aed", "#ef4444"];

const getPartyInitials = (party = "") =>
  party
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

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
  const chartData = useMemo(
    () =>
      sortedCandidates.map((candidate, index) => ({
        ...candidate,
        color: CHART_COLORS[index % CHART_COLORS.length],
        votes: candidate.voteCount || 0,
        percentage:
          totalVotes > 0 ? ((candidate.voteCount || 0) / totalVotes) * 100 : 0,
      })),
    [sortedCandidates, totalVotes]
  );
  const maxVotes = useMemo(
    () => Math.max(...chartData.map((candidate) => candidate.votes), 1),
    [chartData]
  );
  const officialWinner = chartData[0];

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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.9fr 1fr" },
              gap: 2.5,
              alignItems: "stretch",
            }}
          >
            <Card sx={{ borderRadius: "10px", border: "1px solid #dbe7ff", boxShadow: "0 14px 34px rgba(15, 91, 255, 0.08)" }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography fontWeight={900} color="#10295c" fontSize="1.15rem" mb={3}>
                  Results by Candidate
                </Typography>

                <Box sx={{ display: "grid", gap: 2.2 }}>
                  {chartData.map((candidate) => (
                    <Box
                      key={candidate._id}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "210px 1fr 86px" },
                        gap: { xs: 1.25, sm: 1.5 },
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1.35, alignItems: "center", minWidth: 0 }}>
                        <Avatar
                          src={candidate.photo}
                          alt={candidate.fullName}
                          sx={{ width: 58, height: 58, border: "4px solid #eaf0f8" }}
                        />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography color="#10295c" fontWeight={900} fontSize="0.92rem" noWrap>
                            {candidate.fullName}
                          </Typography>
                          <Typography color="#465a83" fontWeight={700} fontSize="0.78rem" noWrap>
                            {candidate.politicalParty}
                            {getPartyInitials(candidate.politicalParty)
                              ? ` (${getPartyInitials(candidate.politicalParty)})`
                              : ""}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          position: "relative",
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          borderLeft: "2px solid #dbe4f2",
                          pl: { xs: 1.5, sm: 0 },
                        }}
                      >
                        <Box
                          sx={{
                            height: 32,
                            width: `${Math.max((candidate.votes / maxVotes) * 100, candidate.votes > 0 ? 5 : 0)}%`,
                            background: candidate.color,
                            borderRadius: "0 5px 5px 0",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>

                      <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                        <Typography color="#10295c" fontWeight={900} fontSize="1.2rem">
                          {candidate.votes.toLocaleString()}
                        </Typography>
                        <Typography color="#10295c" fontWeight={900} fontSize="0.78rem">
                          {candidate.percentage.toFixed(2)}%
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", sm: "grid" },
                    gridTemplateColumns: "210px 1fr 86px",
                    gap: 1.5,
                    mt: 1.5,
                    alignItems: "center",
                  }}
                >
                  <Box />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderLeft: "2px solid #dbe4f2",
                      pt: 1,
                      color: "#465a83",
                      fontSize: "0.82rem",
                      fontWeight: 800,
                    }}
                  >
                    {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                      <Box key={tick}>{Math.round(maxVotes * tick).toLocaleString()}</Box>
                    ))}
                  </Box>
                  <Box />
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: "10px", border: "1px solid #dbe7ff", boxShadow: "0 14px 34px rgba(15, 91, 255, 0.08)" }}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography fontWeight={900} color="#10295c" fontSize="1.15rem" mb={2}>
                  Vote Distribution
                </Typography>

                <Box sx={{ height: 230, mb: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="votes"
                        nameKey="fullName"
                        innerRadius={62}
                        outerRadius={100}
                        paddingAngle={0}
                        stroke="none"
                      >
                        {chartData.map((entry) => (
                          <Cell key={entry._id} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => Number(value).toLocaleString()} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={{ display: "grid", gap: 1.4 }}>
                  {chartData.map((candidate) => (
                    <Box
                      key={candidate._id}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                        <Circle size={12} fill={candidate.color} color={candidate.color} />
                        <Typography color="#10295c" fontWeight={800} fontSize="0.88rem" noWrap>
                          {candidate.politicalParty}
                          {getPartyInitials(candidate.politicalParty)
                            ? ` (${getPartyInitials(candidate.politicalParty)})`
                            : ""}
                        </Typography>
                      </Box>
                      <Typography color="#10295c" fontWeight={900} fontSize="0.88rem">
                        {candidate.percentage.toFixed(2)}%
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #dbe7ff",
                    mt: 2,
                    pt: 2,
                  }}
                >
                  <Typography color="#10295c" fontWeight={900}>
                    Total
                  </Typography>
                  <Typography color="#10295c" fontWeight={900}>
                    {totalVotes > 0 ? "100%" : "0%"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                gridColumn: { xs: "1", lg: "1 / -1" },
                borderRadius: "10px",
                border: "1px solid #bfd7ff",
                background: "linear-gradient(135deg, #eef6ff 0%, #ffffff 100%)",
                boxShadow: "0 14px 34px rgba(15, 91, 255, 0.08)",
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2.5, md: 3 },
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "auto 1fr auto" },
                  gap: 2.5,
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={officialWinner?.photo}
                  alt={officialWinner?.fullName || "Election winner"}
                  sx={{
                    width: 86,
                    height: 86,
                    border: "5px solid #ffffff",
                    boxShadow: "0 12px 28px rgba(15, 91, 255, 0.18)",
                  }}
                />

                <Box>
                  <Typography color="#0f5bff" fontWeight={900} fontSize="0.9rem" mb={0.5}>
                    OFFICIAL WINNER
                  </Typography>
                  <Typography color="#10295c" fontWeight={900} fontSize={{ xs: "1.55rem", md: "2rem" }}>
                    {officialWinner?.fullName || "No winner declared"}
                  </Typography>
                  <Typography color="#465a83" fontWeight={800} mt={0.5}>
                    {officialWinner?.position || "Position not specified"}
                    {officialWinner?.politicalParty ? ` - ${officialWinner.politicalParty}` : ""}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                  <Typography color="#10295c" fontWeight={900} fontSize="1.6rem">
                    {(officialWinner?.votes || 0).toLocaleString()}
                  </Typography>
                  <Typography color="#465a83" fontWeight={800}>
                    votes won
                  </Typography>
                  <Typography color="#0f5bff" fontWeight={900} mt={0.75}>
                    {(officialWinner?.percentage || 0).toFixed(2)}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Results;
