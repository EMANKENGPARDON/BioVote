import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle, ShieldAlert } from "lucide-react";
import { readJson, saveJson, WORKFLOW_KEYS } from "../utils/workflowSession";

function VotePage() {
  const navigate = useNavigate();
  const verifiedVoter = readJson(WORKFLOW_KEYS.verifiedVoter);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [election, setElection] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const electionIsActive = (status) =>
    String(status || "").trim().toLowerCase() === "active";

  useEffect(() => {
    const loadVotingData = async () => {
      try {
        const electionResponse = await API.get("/admin/election-status");
        setElection(electionResponse.data);

        if (!verifiedVoter) return;
        if (verifiedVoter.hasVoted) {
          setError("You have already voted");
          return;
        }
        if (!electionResponse.data || !electionIsActive(electionResponse.data.status)) {
          setError("No active elections currently. Please return when voting opens.");
          return;
        }

        let candidateResponse = await API.get("/candidates", {
          params: { municipality: verifiedVoter.municipality },
        });

        if (candidateResponse.data.length === 0) {
          candidateResponse = await API.get("/candidates");
          setNotice(
            "No candidates matched your municipality exactly, so all registered candidates are shown."
          );
        }

        setCandidates(candidateResponse.data);
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load voting page.");
      }
    };

    loadVotingData();
  }, []);

  const castVote = async () => {
    setSubmitting(true);
    try {
      const response = await API.post("/votes", {
        voterId: verifiedVoter._id,
        candidateId: selectedCandidate._id,
      });

      saveJson(WORKFLOW_KEYS.voteReceipt, {
        candidate: selectedCandidate,
        vote: response.data.vote,
        blockchain: response.data.blockchain,
        transactionId: response.data.transactionId,
      });
      localStorage.removeItem(WORKFLOW_KEYS.verifiedVoter);
      navigate("/vote-success");
    } catch (error) {
      setError(error.response?.data?.message || "Vote submission failed.");
      setConfirmOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const blocked = error || !verifiedVoter || !electionIsActive(election?.status);

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f8ff", px: 2, py: { xs: 6, md: 9 } }}>
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Typography component="h1" fontSize="2.4rem" fontWeight={900} color="#08295c">
          Municipal Ballot
        </Typography>
        <Typography color="#506784" mt={1} mb={3}>
          Select one candidate. Your ballot will be recorded once and written to the blockchain audit trail.
        </Typography>

        {blocked && (
          <Card sx={{ maxWidth: 720, borderRadius: "14px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <ShieldAlert size={56} color="#0f5bff" />
              <Typography fontWeight={900} color="#08295c" fontSize="1.6rem" mt={2}>
                Voting Access Restricted
              </Typography>
              <Typography color="#506784" mt={1} mb={3}>
                {error || "Please complete biometric verification before voting."}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(error === "You have already voted" ? "/" : "/login-vote")}
                sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}
              >
                {error === "You have already voted" ? "Return Home" : "Go to Verification"}
              </Button>
            </CardContent>
          </Card>
        )}

        {!blocked && (
          <>
            <Alert severity="info" sx={{ mb: 3 }}>
              Verified voter: {verifiedVoter.fullName} ({verifiedVoter.municipality})
            </Alert>
            {notice && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                {notice}
              </Alert>
            )}
            {candidates.length === 0 && (
              <Card sx={{ borderRadius: "14px", border: "1px solid #dbe7ff" }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Typography fontWeight={900} color="#08295c" fontSize="1.4rem">
                    No Candidates Available
                  </Typography>
                  <Typography color="#506784" mt={1}>
                    Add candidates from the admin dashboard before voters can cast ballots.
                  </Typography>
                </CardContent>
              </Card>
            )}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                gap: 2.5,
              }}
            >
              {candidates.map((candidate, index) => (
                <motion.div
                  key={candidate._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card sx={{ height: "100%", borderRadius: "14px", border: "1px solid #dbe7ff" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", gap: 2.5, alignItems: "flex-start" }}>
                        <Avatar
                          src={candidate.photo}
                          alt={candidate.fullName}
                          sx={{ width: 88, height: 88, borderRadius: "14px" }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography fontWeight={900} color="#08295c" fontSize="1.25rem">
                            {candidate.fullName}
                          </Typography>
                          <Typography color="#0f5bff" fontWeight={800}>
                            {candidate.politicalParty}
                          </Typography>
                          <Typography color="#506784" fontSize="0.92rem">
                            {candidate.position}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography color="#506784" lineHeight={1.7} mt={2} minHeight={72}>
                        {candidate.manifesto || "No manifesto provided."}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setConfirmOpen(true);
                        }}
                        sx={{
                          mt: 3,
                          borderRadius: "10px",
                          fontWeight: 900,
                          textTransform: "none",
                          background: "#0f5bff",
                        }}
                      >
                        Vote for {candidate.fullName}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </>
        )}
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={900}>Confirm Your Vote</DialogTitle>
        <DialogContent>
          <Typography color="#506784">
            You are about to vote for <strong>{selectedCandidate?.fullName}</strong> of{" "}
            <strong>{selectedCandidate?.politicalParty}</strong>. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setConfirmOpen(false)} sx={{ fontWeight: 800 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircle size={18} />}
            disabled={submitting}
            onClick={castVote}
            sx={{ fontWeight: 900, textTransform: "none" }}
          >
            {submitting ? "Recording..." : "Submit Vote"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default VotePage;
