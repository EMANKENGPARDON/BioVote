import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import {
  People,
  Person,
  HowToVote,
  BarChart,
} from "@mui/icons-material";

import { motion } from "framer-motion";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

import API from "../services/api";
import BrandHeader from "../components/BrandHeader";

function Dashboard() {

  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      const votersResponse =
        await API.get("/voters");

      const candidatesResponse =
        await API.get("/candidates");

      setVoters(votersResponse.data);

      setCandidates(
        candidatesResponse.data
      );

    } catch (error) {
      console.error(error);
    }
  };

  // TOTAL VOTES

  const totalVotes =
    candidates.reduce(
      (sum, candidate) =>
        sum + (candidate.voteCount || 0),
      0
    );

  // TURNOUT %

  const turnout =
    voters.length > 0
      ? (
          (totalVotes /
            voters.length) *
          100
        ).toFixed(1)
      : 0;

  // CHART DATA

  const chartData =
    candidates.map((candidate) => ({
      name:
        candidate.politicalParty,
      votes:
        candidate.voteCount || 0,
    }));

  return (
  <Box
  className="app-page"
  sx={{
    minHeight: "100vh",
  }}
>

  {/* MAIN CONTENT */}

<Box
  sx={{
    maxWidth: "1400px",
    margin: "0 auto",
  }}
>

  {/* HEADER */}

  <BrandHeader
    title="Election Dashboard"
    subtitle="Real-time municipal election analytics and monitoring."
  />

  {/* STATS */}

  <Grid container spacing={3}>
    <Grid item xs={12} md={3}>
      <AnimatedCard
        icon={<People sx={iconStyle} />}
        value={voters.length}
        label="Registered Voters"
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <AnimatedCard
        icon={<Person sx={iconStyle} />}
        value={candidates.length}
        label="Candidates"
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <AnimatedCard
        icon={<HowToVote sx={iconStyle} />}
        value={totalVotes}
        label="Votes Cast"
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <AnimatedCard
        icon={<BarChart sx={iconStyle} />}
        value={`${turnout}%`}
        label="Turnout Rate"
      />
    </Grid>
  </Grid>

  {/* CHART */}

  <Card
  className="brand-card"
sx={{
  mt: 5,
  borderRadius: "26px",
  p: 3,
}}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      mb={3}
    >
      Election Results
    </Typography>

    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <ReBarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="votes"
          fill="#3239b7"
          radius={[10, 10, 0, 0]}
        />
      </ReBarChart>
    </ResponsiveContainer>
  </Card>

  {/* CANDIDATE LEADERBOARD */}

 <Card
  className="brand-card"
  sx={{
    mt: 5,
    mb: 4,
    borderRadius: "26px",
    background:
      "linear-gradient(135deg,#11143f,#3239b7,#8188ee)",
    color: "white",
    boxShadow:
      "0 20px 40px rgba(37,99,235,0.25)",
  }}
>
  <CardContent sx={{ p: 5 }}>
    <Typography
      variant="h3"
      fontWeight="bold"
    >
      Candidate Leaderboard
    </Typography>

    <Typography mt={1}>
      Real-time election monitoring,
      analytics and result tracking.
    </Typography>
  </CardContent>
</Card>

    <Typography
      variant="h5"
      fontWeight="bold"
      mb={3}
    >
      Candidate Rankings
    </Typography>
       {[...candidates]
        .sort(
        (a, b) =>
          (b.voteCount || 0) - (a.voteCount || 0)
      )
      .map((candidate, index) => (
        <Box
          key={candidate._id}
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 2,
            py: 2,
            borderBottom:
              "1px solid rgba(50,57,183,0.12)",
          }}
        >
          <Box>
            <Typography
              fontWeight="bold"
            >
              #{index + 1}{" "}
              {candidate.fullName}
            </Typography>

            <Typography
              color="gray"
            >
              {
                candidate.politicalParty
              }
            </Typography>
          </Box>

          <Typography
            fontWeight="bold"
            color="#3239b7"
          >
            {candidate.voteCount || 0} votes
          </Typography>
        </Box>
      ))}
</Box>
    </Box>
  );
}
function AnimatedCard({
  icon,
  value,
  label,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Card
        className="brand-card"
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,

              borderRadius: "20px",

              background:
                "linear-gradient(135deg,#11143f,#3239b7)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              color: "white",

              mb: 3,
            }}
          >
            {icon}
          </Box>

          <Typography
            variant="h3"
            fontWeight="bold"
          >
            {value}
          </Typography>

          <Typography
            color="gray"
            mt={1}
          >
            {label}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
const iconStyle = {
  fontSize: 30,
  color: "white",
};
export default Dashboard;
