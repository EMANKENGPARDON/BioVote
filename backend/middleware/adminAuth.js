const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1] || "";
  const expectedToken =
    process.env.ADMIN_TOKEN || "biovote-admin-token";

  if (token === expectedToken) {
    return next();
  }

  res.status(401).json({
    message: "Unauthorized. Admin access required.",
  });
};

module.exports = adminAuth;
