const login = (req, res) => {
  const { username, password } = req.body;
  const submittedUsername = String(username || "").trim();
  const submittedPassword = String(password || "").trim();

  if (
    submittedUsername === process.env.ADMIN_USERNAME &&
    submittedPassword === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      token: process.env.ADMIN_TOKEN || "biovote-admin-token",
      username: process.env.ADMIN_USERNAME,
    });
  }

  return res.status(401).json({
    message: "Invalid admin credentials",
  });
};

module.exports = {
  login,
};
