import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { BarChart3, Database, Play, Square, Trash2 } from "lucide-react";
import { WORKFLOW_KEYS } from "../utils/workflowSession";

const initialElection = {
  title: "",
  municipality: "",
  startDate: "",
  endDate: "",
  status: "Upcoming",
};

const initialCandidate = {
  fullName: "",
  politicalParty: "",
  position: "",
  municipality: "",
  manifesto: "",
  photo: "",
};

function Admin() {
  const token = localStorage.getItem(WORKFLOW_KEYS.adminToken);
  const adminConfig = { headers: { Authorization: `Bearer ${token}` } };
  const [election, setElection] = useState(null);
  const [electionForm, setElectionForm] = useState(initialElection);
  const [candidateForm, setCandidateForm] = useState(initialCandidate);
  const [editingCandidateId, setEditingCandidateId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [verificationRequests, setVerificationRequests] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [
        verificationResponse,
        electionRes,
        candidateRes,
        voterRes,
        analyticsRes,
        blockRes,
      ] = await Promise.all([
        API.get("/verifications"),
        API.get("/admin/election", adminConfig),
        API.get("/candidates"),
        API.get("/voters"),
        API.get("/votes/analytics", adminConfig),
        API.get("/admin/blockchain", adminConfig),
      ]);
      setVerificationRequests(verificationResponse.data);
      setElection(electionRes.data);
      setCandidates(candidateRes.data);
      setVoters(voterRes.data);
      setAnalytics(analyticsRes.data);
      setBlocks(blockRes.data);
    } catch (error) {
      setError(error.response?.data?.message || "Could not load admin data.");
    }
  };

  const loadVerifications = async () => {
    const res = await API.get("/verifications");
    setVerificationRequests(res.data);
  };

  const loadCandidatesAndAnalytics = async () => {
    const [candidateRes, analyticsRes] = await Promise.all([
      API.get("/candidates"),
      API.get("/votes/analytics", adminConfig),
    ]);
    setCandidates(candidateRes.data);
    setAnalytics(analyticsRes.data);
  };

  const loadVotersAndAnalytics = async () => {
    const [voterRes, analyticsRes] = await Promise.all([
      API.get("/voters"),
      API.get("/votes/analytics", adminConfig),
    ]);
    setVoters(voterRes.data);
    setAnalytics(analyticsRes.data);
  };

  const approveVerification = async (verificationId) => {
    try {
      await API.patch(`/verifications/approve/${verificationId}`, {}, adminConfig);
      await loadVerifications();
      setNotice("Verification request approved.");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Could not approve verification request.");
    }
  };

  const rejectVerification = async (verificationId) => {
    try {
      await API.patch(`/verifications/reject/${verificationId}`, {}, adminConfig);
      await loadVerifications();
      setNotice("Verification request rejected.");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Could not reject verification request.");
    }
  };

  const saveElection = async () => {
    try {
      setNotice("");
      setError("");
      const response = await API.post("/admin/election", electionForm, adminConfig);
      setElection(response.data);
      setNotice("Election saved.");
    } catch (error) {
      setError(error.response?.data?.message || "Could not save election.");
    }
  };

  const setElectionStatus = async (status) => {
  try {
    const url =
      status === "Active"
        ? "/admin/election/start"
        : "/admin/election/end";

    const response = await API.patch(
      url,
      {},
      adminConfig
    );

    setElection(response.data);

    setNotice(
      status === "Active"
        ? "Election started."
        : "Election closed successfully. Publishing results..."
    );

    // Automatically redirect to results page when election closes
    if (status === "Closed") {
      setTimeout(() => {
        navigate("/results");
      }, 4500);
    }

  } catch (error) {
    setError(
      error.response?.data?.message ||
      "Could not update election status."
    );
  }
};

  const saveCandidate = async () => {
    try {
      if (editingCandidateId) {
        await API.patch(`/candidates/${editingCandidateId}`, candidateForm, adminConfig);
        setNotice("Candidate updated.");
      } else {
        await API.post("/candidates", candidateForm, adminConfig);
        setNotice("Candidate added.");
      }
      setCandidateForm(initialCandidate);
      setEditingCandidateId("");
      await loadCandidatesAndAnalytics();
    } catch (error) {
      setError(error.response?.data?.message || "Could not save candidate.");
    }
  };

  const editCandidate = (candidate) => {
    setEditingCandidateId(candidate._id);
    setCandidateForm({
      fullName: candidate.fullName || "",
      politicalParty: candidate.politicalParty || "",
      position: candidate.position || "",
      municipality: candidate.municipality || "",
      manifesto: candidate.manifesto || "",
      photo: candidate.photo || "",
    });
  };

  const deleteCandidate = async (id) => {
    await API.delete(`/candidates/${id}`, adminConfig);
    await loadCandidatesAndAnalytics();
  };

  const deleteVoter = async (id) => {
    await API.delete(`/voters/${id}`, adminConfig);
    await loadVotersAndAnalytics();
  };

  const filteredVoters = useMemo(
    () =>
      voters.filter((voter) =>
        `${voter.fullName} ${voter.nationalId} ${voter.email} ${voter.municipality}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [voters, search]
  );

  const metrics = [
    ["Registered Voters", analytics?.totalRegisteredVoters || voters.length],
    ["Votes Cast", analytics?.totalVotesCast || 0],
    ["Turnout", `${analytics?.turnoutPercentage || 0}%`],
    ["Candidates", candidates.length],
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f8ff", px: 2, py: { xs: 4, md: 6 } }}>
      <Box sx={{ maxWidth: 1320, mx: "auto" }}>
        <Typography component="h1" fontSize="2.4rem" fontWeight={900} color="#08295c">
          Admin Dashboard
        </Typography>
        <Typography color="#506784" mt={1} mb={3}>
          Manage election status, candidates, voters, analytics, and blockchain logs.
        </Typography>

        {notice && <Alert severity="success" sx={{ mb: 2 }}>{notice}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2, mb: 3 }}>
          {metrics.map(([label, value]) => (
            <Card key={label} sx={{ borderRadius: "12px", border: "1px solid #dbe7ff" }}>
              <CardContent>
                <Typography color="#506784" fontWeight={800}>{label}</Typography>
                <Typography color="#08295c" fontWeight={900} fontSize="2rem">{value}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.05fr" }, gap: 3 }}>
          <Card sx={{ borderRadius: "12px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography fontWeight={900} color="#08295c" fontSize="1.4rem" mb={2}>
                Create Election
              </Typography>
              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField label="Election Title" value={electionForm.title} onChange={(e) => setElectionForm({ ...electionForm, title: e.target.value })} />
                <TextField label="Municipality" value={electionForm.municipality} onChange={(e) => setElectionForm({ ...electionForm, municipality: e.target.value })} />
                <TextField label="Start Date" type="datetime-local" InputLabelProps={{ shrink: true }} value={electionForm.startDate} onChange={(e) => setElectionForm({ ...electionForm, startDate: e.target.value })} />
                <TextField label="End Date" type="datetime-local" InputLabelProps={{ shrink: true }} value={electionForm.endDate} onChange={(e) => setElectionForm({ ...electionForm, endDate: e.target.value })} />
                <TextField select label="Status" value={electionForm.status} onChange={(e) => setElectionForm({ ...electionForm, status: e.target.value })}>
                  {["Upcoming", "Active", "Closed"].map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                </TextField>
                <Button variant="contained" onClick={saveElection} sx={{ borderRadius: "10px", fontWeight: 900, textTransform: "none" }}>
                  Save Election
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />
              <Typography fontWeight={900} color="#08295c" mb={1}>Election Control</Typography>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
                <Chip label={election?.status || "No election"} color={election?.status === "Active" ? "success" : "default"} />
                <Button startIcon={<Play size={16} />} variant="outlined" onClick={() => setElectionStatus("Active")}>Start Election</Button>
                <Button startIcon={<Square size={16} />} variant="outlined" color="error" onClick={() => setElectionStatus("Closed")}>End Election</Button>
              </Box>
            </CardContent>
          </Card>

          <Card
  sx={{
    borderRadius: "16px",
    border: "1px solid #dbe7ff",
    mt: 3,
  }}
>
  <CardContent>
    <Typography
      variant="h5"
      fontWeight={900}
      mb={3}
      color="#08295c"
    >
      Pending Biometric Verifications
    </Typography>

    {verificationRequests.length === 0 ? (
      <Alert severity="info">
        No verification requests available.
      </Alert>
    ) : (
      verificationRequests.map((request) => (
        <Box
          key={request._id}
          sx={{
            mb: 3,
            p: 2,
            border: "1px solid #dbe7ff",
            borderRadius: "12px",
          }}
        >
          <Typography
            fontWeight={900}
            color="#08295c"
          >
            {request.voter?.fullName}
          </Typography>

          <Typography mb={2}>
            Status: {request.status}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <Box>
              <Typography fontWeight={800}>
                Registered Photo
              </Typography>

              <img
                src={request.registeredImage}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </Box>

            <Box>
              <Typography fontWeight={800}>
                Live Capture
              </Typography>

              <img
                src={request.liveImage}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>

          {request.status === "Pending" && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  approveVerification(
                    request._id
                  )
                }
              >
                Approve
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  rejectVerification(
                    request._id
                  )
                }
              >
                Reject
              </Button>
            </Box>
          )}
        </Box>
      ))
    )}
  </CardContent>
</Card>

          <Card sx={{ borderRadius: "12px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography fontWeight={900} color="#08295c" fontSize="1.4rem" mb={2}>
                Manage Candidates
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                <TextField label="Name" value={candidateForm.fullName} onChange={(e) => setCandidateForm({ ...candidateForm, fullName: e.target.value })} />
                <TextField label="Party" value={candidateForm.politicalParty} onChange={(e) => setCandidateForm({ ...candidateForm, politicalParty: e.target.value })} />
                <TextField label="Position" value={candidateForm.position} onChange={(e) => setCandidateForm({ ...candidateForm, position: e.target.value })} />
                <TextField label="Municipality" value={candidateForm.municipality} onChange={(e) => setCandidateForm({ ...candidateForm, municipality: e.target.value })} />
                <TextField label="Photo URL or Base64" value={candidateForm.photo} onChange={(e) => setCandidateForm({ ...candidateForm, photo: e.target.value })} sx={{ gridColumn: { sm: "1 / -1" } }} />
                <TextField multiline rows={3} label="Manifesto" value={candidateForm.manifesto} onChange={(e) => setCandidateForm({ ...candidateForm, manifesto: e.target.value })} sx={{ gridColumn: { sm: "1 / -1" } }} />
              </Box>
              <Button variant="contained" onClick={saveCandidate} sx={{ mt: 2, borderRadius: "10px", fontWeight: 900, textTransform: "none" }}>
                {editingCandidateId ? "Update Candidate" : "Add Candidate"}
              </Button>

              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: "grid", gap: 1.5 }}>
                {candidates.map((candidate) => (
                  <Box key={candidate._id} sx={{ display: "flex", gap: 2, alignItems: "center", border: "1px solid #dbe7ff", borderRadius: "10px", p: 1.5 }}>
                    <Avatar src={candidate.photo} alt={candidate.fullName} />
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={900} color="#08295c">{candidate.fullName}</Typography>
                      <Typography color="#506784" fontSize="0.9rem">{candidate.politicalParty} - {candidate.voteCount || 0} votes</Typography>
                    </Box>
                    <Button onClick={() => editCandidate(candidate)}>Edit</Button>
                    <Button color="error" onClick={() => deleteCandidate(candidate._id)}><Trash2 size={16} /></Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3, mt: 3 }}>
          <Card sx={{ borderRadius: "12px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography fontWeight={900} color="#08295c" fontSize="1.4rem" mb={2}>
                Manage Voters
              </Typography>
              <TextField fullWidth label="Search voters" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 2 }} />
              <Box sx={{ display: "grid", gap: 1.5, maxHeight: 430, overflow: "auto" }}>
                {filteredVoters.map((voter) => (
                  <Box key={voter._id} sx={{ display: "flex", gap: 2, alignItems: "center", border: "1px solid #dbe7ff", borderRadius: "10px", p: 1.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={900} color="#08295c">{voter.fullName}</Typography>
                      <Typography color="#506784" fontSize="0.9rem">
                        {voter.nationalId} - {voter.email || "No email"} - {voter.municipality}
                      </Typography>
                    </Box>
                    <Chip label={voter.hasVoted ? "Voted" : "Not voted"} size="small" />
                    <Button color="error" onClick={() => deleteVoter(voter._id)}><Trash2 size={16} /></Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: "12px", border: "1px solid #dbe7ff" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography fontWeight={900} color="#08295c" fontSize="1.4rem" mb={2} display="flex" gap={1}>
                <BarChart3 /> Analytics and Rankings
              </Typography>
              <Box sx={{ display: "grid", gap: 1.5, mb: 3 }}>
                {(analytics?.candidateRankings || candidates).map((candidate, index) => (
                  <Box key={candidate._id} sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #dbe7ff", py: 1 }}>
                    <Typography color="#08295c" fontWeight={800}>#{index + 1} {candidate.fullName}</Typography>
                    <Typography color="#0f5bff" fontWeight={900}>{candidate.voteCount || 0} votes</Typography>
                  </Box>
                ))}
              </Box>

              <Typography fontWeight={900} color="#08295c" fontSize="1.4rem" mb={2} display="flex" gap={1}>
                <Database /> Blockchain Logs
              </Typography>
              <Box sx={{ display: "grid", gap: 1.5, maxHeight: 300, overflow: "auto" }}>
                {blocks.map((block) => (
                  <Box key={block._id} sx={{ border: "1px solid #dbe7ff", borderRadius: "10px", p: 1.5 }}>
                    <Typography fontWeight={900} color="#08295c">Block #{block.index}</Typography>
                    <Typography color="#506784" fontSize="0.84rem" sx={{ overflowWrap: "anywhere" }}>Previous: {block.previousHash}</Typography>
                    <Typography color="#506784" fontSize="0.84rem" sx={{ overflowWrap: "anywhere" }}>Vote Hash: {block.voteHash}</Typography>
                    <Typography color="#506784" fontSize="0.84rem">Timestamp: {new Date(block.timestamp || block.createdAt).toLocaleString()}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Admin;
