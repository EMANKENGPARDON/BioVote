import { Box, Grid, Card, Typography } from "@mui/material";

const topics = [
  {
    title: "How BioVote Works",
    details:
      "BioVote uses secured voter registration, biometric verification, and transparent result tracking to protect every ballot.",
  },
  {
    title: "Why Verify Identity",
    details:
      "Face and biometric checks prevent duplicate voting and ensure that only eligible voters participate in each election.",
  },
  {
    title: "Your Rights",
    details:
      "Every voter has the right to free, fair, and private voting. Your ballot should be counted without compromise.",
  },
  {
    title: "What To Expect",
    details:
      "The admin organizes elections, publishes candidates, opens and closes voting, and shares verified results.",
  },
];

function EducationSection() {
  return (
    <Box
      sx={{
        mt: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "#11143f", mb: 2 }}
      >
        Learn About BioVote
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        sx={{ color: "#5f677b", maxWidth: 760, mx: "auto", mb: 6 }}
      >
        Before you join an election, understand how the system protects your vote, preserves privacy,
        and keeps verified election management transparent.
      </Typography>

      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} md={6} key={topic.title}>
            <Card
              className="brand-card"
              sx={{ p: 4, borderRadius: "28px", minHeight: 210 }}
            >
              <Typography variant="h5" fontWeight="bold" mb={2}>
                {topic.title}
              </Typography>
              <Typography color="#58607d">{topic.details}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EducationSection;
