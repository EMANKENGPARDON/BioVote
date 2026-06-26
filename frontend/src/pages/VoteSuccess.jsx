import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle, Hash } from "lucide-react";
import { readJson, WORKFLOW_KEYS } from "../utils/workflowSession";

function VoteSuccess() {
  const receipt = readJson(WORKFLOW_KEYS.voteReceipt);

  if (!receipt) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f8ff", px: 2, py: { xs: 6, md: 9 } }}>
      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <Card sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: "center" }}>
            <CheckCircle size={76} color="#12a150" />
            <Typography component="h1" fontSize="2.25rem" fontWeight={900} color="#08295c" mt={2}>
              Vote Successfully Recorded
            </Typography>
            <Typography color="#506784" mt={1} mb={4}>
              Thank you for participating in the municipal election. Please stay tuned for official election results.
            </Typography>

            <Box
              sx={{
                textAlign: "left",
                background: "#f8fbff",
                border: "1px solid #dbe7ff",
                borderRadius: "12px",
                p: 3,
                mb: 4,
              }}
            >
              <Typography fontWeight={900} color="#08295c" display="flex" gap={1} alignItems="center">
                <Hash size={18} /> Blockchain Receipt
              </Typography>
              <Typography color="#506784" mt={2}>
                Blockchain Transaction ID: {receipt.transactionId || receipt.vote?.transactionId || receipt.vote?._id}
              </Typography>
              <Typography color="#506784" sx={{ overflowWrap: "anywhere" }}>
                Blockchain Hash: {receipt.blockchain?.transactionHash}
              </Typography>
              <Typography color="#506784">
                Block Index: {receipt.blockchain?.blockIndex}
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
            >
              Return to Landing Page
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default VoteSuccess;
