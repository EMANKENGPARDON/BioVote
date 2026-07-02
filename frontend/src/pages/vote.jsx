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
import { CheckCircle, FileText, LockKeyhole, Shield, ShieldAlert } from "lucide-react";
import { readJson, saveJson, WORKFLOW_KEYS } from "../utils/workflowSession";

const partyColors = ["#0f5bff", "#31b85f", "#f4b51f", "#7c3aed", "#ef4444"];

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
        if (candidateResponse.data.length > 0) {
          setSelectedCandidate(candidateResponse.data[0]);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load voting page.");
      }
    };

    loadVotingData();
  }, []);

  const castVote = async () => {
    if (!selectedCandidate) return;

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
    <Box sx={{ minHeight: "100vh", background: "#f7fbff", px: 2, py: { xs: 6, md: 8 } }}>
      <Box sx={{ maxWidth: 1080, mx: "auto" }}>
        {blocked && (
          <Card sx={{ maxWidth: 720, mx: "auto", borderRadius: "10px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <ShieldAlert size={56} color="#0f5bff" />
              <Typography fontWeight={900} color="#10295c" fontSize="1.6rem" mt={2}>
                Voting Access Restricted
              </Typography>
              <Typography color="#506784" mt={1} mb={3}>
                {error || "Please complete biometric verification before voting."}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(error === "You have already voted" ? "/" : "/login-vote")}
                sx={{ borderRadius: "8px", fontWeight: 900, textTransform: "none" }}
              >
                {error === "You have already voted" ? "Return Home" : "Go to Verification"}
              </Button>
            </CardContent>
          </Card>
        )}

        {!blocked && (
          <Box
            sx={{
              background: "#ffffff",
              border: "1px solid #e1e9f8",
              boxShadow: "0 16px 45px rgba(15, 91, 255, 0.08)",
              px: { xs: 2.25, sm: 3.5, md: 4 },
              py: { xs: 3, md: 4 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: "#14295c",
                fontWeight: 900,
                fontSize: { xs: "1.55rem", md: "1.85rem" },
                mb: 1.75,
              }}
            >
              Select Your Preferred Candidate
            </Typography>
            <Typography color="#465a83" sx={{ mb: 3.5, fontSize: { xs: "0.95rem", md: "1rem" } }}>
              Choose the candidate you want to elect for your municipality.
            </Typography>

            {notice && (
              <Alert severity="warning" sx={{ mb: 3, borderRadius: "8px" }}>
                {notice}
              </Alert>
            )}

            {candidates.length === 0 ? (
              <Card sx={{ borderRadius: "10px", border: "1px solid #dbe7ff" }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Typography fontWeight={900} color="#14295c" fontSize="1.4rem">
                    No Candidates Available
                  </Typography>
                  <Typography color="#506784" mt={1}>
                    Add candidates from the admin dashboard before voters can cast ballots.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                      md: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: { xs: 2.25, md: 3 },
                  }}
                >
                  {candidates.map((candidate, index) => {
                    const isSelected = selectedCandidate?._id === candidate._id;
                    const partyColor = partyColors[index % partyColors.length];

                    return (
                      <motion.div
                        key={candidate._id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedCandidate(candidate)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setSelectedCandidate(candidate);
                            }
                          }}
                          sx={{
                            position: "relative",
                            height: "100%",
                            minHeight: 430,
                            borderRadius: "10px",
                            border: isSelected ? "2px solid #0f5bff" : "1px solid #d8e2f2",
                            boxShadow: isSelected
                              ? "0 18px 40px rgba(15, 91, 255, 0.16)"
                              : "0 10px 28px rgba(8, 41, 92, 0.05)",
                            cursor: "pointer",
                            overflow: "hidden",
                            transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                            "&:hover": {
                              transform: "translateY(-3px)",
                              borderColor: "#0f5bff",
                            },
                          }}
                        >
                          {isSelected && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                background: "#0f5bff",
                                color: "#ffffff",
                                px: 1.4,
                                py: 0.8,
                                fontWeight: 900,
                                fontSize: "0.78rem",
                                borderBottomRightRadius: "6px",
                                zIndex: 2,
                              }}
                            >
                              SELECTED
                            </Box>
                          )}

                          <Box
                            sx={{
                              position: "absolute",
                              top: 22,
                              right: 18,
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              border: isSelected ? "3px solid #0f5bff" : "3px solid #bfd0ea",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#ffffff",
                            }}
                          >
                            {isSelected && (
                              <Box
                                sx={{
                                  width: 14,
                                  height: 14,
                                  borderRadius: "50%",
                                  background: "#0f5bff",
                                }}
                              />
                            )}
                          </Box>

                          <CardContent
                            sx={{
                              height: "100%",
                              p: { xs: 3, md: 3.2 },
                              pt: 4,
                              textAlign: "center",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={candidate.photo}
                              alt={candidate.fullName}
                              sx={{
                                width: 138,
                                height: 138,
                                mb: 2.4,
                                background: "#eaf0f8",
                                border: "10px solid #eaf0f8",
                                boxSizing: "content-box",
                              }}
                            />

                            <Typography
                              sx={{
                                color: "#14295c",
                                fontWeight: 900,
                                fontSize: "1.18rem",
                                minHeight: 32,
                              }}
                            >
                              {candidate.fullName}
                            </Typography>

                            <Box
                              sx={{
                                mt: 1.2,
                                mb: 2.2,
                                px: 1.6,
                                py: 0.8,
                                borderRadius: "6px",
                                background: partyColor,
                                color: "#ffffff",
                                fontWeight: 900,
                                fontSize: "0.82rem",
                              }}
                            >
                              {candidate.politicalParty}
                            </Box>

                            <Typography color="#14295c" fontWeight={900} fontSize="0.95rem" mb={0.8}>
                              Our Vision
                            </Typography>
                            <Typography
                              color="#465a83"
                              fontSize="0.94rem"
                              lineHeight={1.65}
                              sx={{ maxWidth: 220, minHeight: 78 }}
                            >
                              {candidate.manifesto || "No manifesto provided."}
                            </Typography>

                            <Button
                              variant="text"
                              startIcon={<FileText size={17} />}
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedCandidate(candidate);
                              }}
                              sx={{
                                mt: "auto",
                                color: "#0f5bff",
                                fontWeight: 900,
                                textTransform: "none",
                                "&:hover": { background: "rgba(15, 91, 255, 0.06)" },
                              }}
                            >
                              View Manifesto
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: { xs: 2.25, md: 2.8 },
                    borderRadius: "8px",
                    border: "1px solid #bfd7ff",
                    background: "linear-gradient(135deg, #eef6ff 0%, #f8fbff 100%)",
                    display: "flex",
                    gap: 1.75,
                    alignItems: "flex-start",
                  }}
                >
                  <Shield size={28} color="#0f5bff" />
                  <Box>
                    <Typography color="#0f5bff" fontWeight={900} fontSize="1.1rem" mb={0.6}>
                      Important Notice
                    </Typography>
                    <Typography color="#465a83" fontSize="0.95rem">
                      You can only cast one vote. Once you confirm your vote, it cannot be changed.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<LockKeyhole size={20} />}
                    disabled={!selectedCandidate || submitting}
                    onClick={() => setConfirmOpen(true)}
                    sx={{
                      minWidth: { xs: "100%", sm: 360 },
                      borderRadius: "8px",
                      py: 1.65,
                      background: "#005ce6",
                      boxShadow: "0 12px 28px rgba(0, 92, 230, 0.22)",
                      fontWeight: 900,
                      textTransform: "none",
                      fontSize: "1rem",
                      "&:hover": { background: "#0049bf" },
                    }}
                  >
                    {submitting ? "Casting Vote..." : "Confirm & Cast My Vote"}
                  </Button>

                  <Box
                    sx={{
                      mt: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.8,
                      color: "#6a7c9f",
                    }}
                  >
                    <LockKeyhole size={16} />
                    <Typography fontSize="0.9rem">
                      Your vote is encrypted and recorded on the blockchain
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
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
