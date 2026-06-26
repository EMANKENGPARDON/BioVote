import {
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../services/api";

function AnalyticsSection() {

  const [voters, setVoters] =
    useState([]);

  const [candidates, setCandidates] =
    useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const votersResponse =
        await API.get("/voters");

      const candidatesResponse =
        await API.get("/candidates");

      setVoters(
        votersResponse.data
      );

      setCandidates(
        candidatesResponse.data
      );

    } catch (error) {
      console.error(error);
    }
  };

  const totalVotes =
    candidates.reduce(
      (sum, candidate) =>
        sum +
        (candidate.voteCount || 0),
      0
    );

  const turnout =
    voters.length > 0
      ? (
          (totalVotes /
            voters.length) *
          100
        ).toFixed(1)
      : 0;

  return (
    <Box
      sx={{
        mt: { xs: 8, md: 15 },
        px: { xs: 3, md: 5 },
      }}
    >
      <Typography
  variant="h2"
  fontWeight="bold"
  textAlign="center"
  sx={{
    color: "#11143f",
    fontSize: { xs: "2.2rem", md: "3.5rem" },
    WebkitBackgroundClip: "text",
    mb: 2,
  }}
>
  Live Election Analytics
</Typography>

      <Typography
        textAlign="center"
        color="#64748b"
        sx={{
          mt: 2,
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        Real-time monitoring of voter
        turnout, candidate performance,
        and election transparency.
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ mt: 4 }}
      >
        <Grid item xs={12} md={4}>
          <AnalyticsCard
            number={`${turnout}%`}
            title="Voter Turnout"
            description="Municipal participation rate."
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AnalyticsCard
            number={voters.length}
            title="Registered Voters"
            description="Verified voters in the system."
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AnalyticsCard
           number={candidates.length}
           title="Candidates"
           description="Registered election candidates."
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function AnalyticsCard({
  number,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
    >
      <Card
        className="brand-card"
        sx={{
          p: 4,
          borderRadius: "24px",
          transition: "all 0.4s ease",

"&:hover": {
  boxShadow:
    "0 35px 70px rgba(50,57,183,0.22)",
},
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#3239b7"
        >
          {number}
        </Typography>

        <Typography
          variant="h6"
          mt={1}
        >
          {title}
        </Typography>

        <Typography
          color="gray"
          mt={2}
        >
          {description}
        </Typography>
      </Card>
    </motion.div>
  );
}

export default AnalyticsSection;
