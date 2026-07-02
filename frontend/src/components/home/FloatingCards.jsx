import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../services/api";

const people = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=180&q=80",
];

function FloatingCards() {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  const rankedCandidates = [...candidates]
    .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
    .slice(0, 3);

  const turnout =
    voters.length > 0 ? ((totalVotes / voters.length) * 100).toFixed(1) : 0;

  return (
    <Box
      sx={{
        mt: { xs: 6, md: 10 },
        position: "relative",
        minHeight: { xs: "auto", md: "550px" },
        px: 3,
        display: { xs: "grid", md: "block" },
        gap: 3,
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{ position: "absolute", left: "5%", top: "80px" }}
      >
        <Card
          className="brand-card"
          sx={{
            width: 280,
            borderRadius: "24px",
            display: { xs: "none", md: "block" },
          }}
        >
          <CardContent>
            <img className="person-avatar" src={people[0]} alt="Voter profile" />

            <Typography fontWeight="bold" mb={2} mt={2} color="#11143f">
              Voter Analytics
            </Typography>

            <Typography color="#626a86">Registered Voters</Typography>

            <Typography variant="h3" fontWeight="bold" color="#3239b7">
              {voters.length}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          maxWidth: "min(500px, 100%)",
        }}
      >
        <Card
          className="brand-card"
          sx={{
            width: { xs: "100%", md: 500 },
            borderRadius: "28px",
            p: { xs: 1, md: 3 },
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#11143f">
              Election Dashboard
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <GlassCard title="Votes Cast" value={totalVotes} />
              </Grid>

              <Grid item xs={6}>
                <GlassCard title="Turnout" value={`${turnout}%`} />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: "22px",
                background: "#eef0ff",
              }}
            >
              <Typography fontWeight="bold" color="#11143f">
                Live Election Performance
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-end",
                  mt: 3,
                }}
              >
                <Bar h={70} />
                <Bar h={120} />
                <Bar h={90} />
                <Bar h={150} />
                <Bar h={110} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4.5 }}
        style={{ position: "absolute", right: "5%", top: "100px" }}
      >
        <Card
          className="brand-card"
          sx={{
            width: 280,
            borderRadius: "24px",
            display: { xs: "none", md: "block" },
          }}
        >
          <CardContent>
            <Typography fontWeight="bold" mb={2} color="#11143f">
              Candidate Rankings
            </Typography>

            {rankedCandidates.length > 0 ? (
              rankedCandidates.map((candidate, index) => (
                <Ranking
                  key={candidate._id}
                  name={candidate.politicalParty || candidate.fullName}
                  votes={candidate.voteCount || 0}
                  image={candidate.photo || people[index % people.length]}
                />
              ))
            ) : (
              <Typography color="#626a86">No candidates registered yet.</Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}

function GlassCard({ title, value }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "20px",
        background: "rgba(255,255,255,0.72)",
      }}
    >
      <Typography color="#626a86">{title}</Typography>

      <Typography variant="h4" fontWeight="bold" color="#11143f">
        {value}
      </Typography>
    </Box>
  );
}

function Ranking({ name, votes, image }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <img
          src={image}
          alt={`${name} candidate`}
          style={{
            width: 36,
            height: 36,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />

        <Typography>{name}</Typography>
      </Box>

      <Typography fontWeight="bold" color="#3239b7">
        {votes}
      </Typography>
    </Box>
  );
}

function Bar({ h }) {
  return (
    <Box
      sx={{
        width: 40,
        height: h,
        borderRadius: 3,
        background: "linear-gradient(to top,#3239b7,#9aa2ff)",
      }}
    />
  );
}

export default FloatingCards;
