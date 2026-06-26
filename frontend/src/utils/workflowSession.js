export const WORKFLOW_KEYS = {
  registeredNationalId: "biovote-registered-national-id",
  verifiedVoter: "biovote-verified-voter",
  voteReceipt: "biovote-vote-receipt",
  adminToken: "biovote-admin-token",
};

export const saveJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
};

export const clearVoterWorkflow = () => {
  localStorage.removeItem(WORKFLOW_KEYS.registeredNationalId);
  localStorage.removeItem(WORKFLOW_KEYS.verifiedVoter);
};
