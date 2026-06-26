export const pageWrapper = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dbe5fa 0%, #dde3fa 100%)",
  pt: { xs: 13, md: 15 },
  pb: { xs: 6, md: 8 },
  px: { xs: 2, sm: 3 },
};

export const pageContainer = {
  width: "100%",
  maxWidth: "980px",
  mx: "auto",
};

export const sectionCard = {
  borderRadius: "16px",
  border: "1px solid rgba(112, 122, 235, 0.18)",
  boxShadow: "0 18px 48px rgba(15, 91, 255, 0.12)",
  overflow: "hidden",
  backgroundColor: "rgba(250, 250, 255, 0.98)",
};

export const sectionCardContent = {
  p: { xs: 3, md: 4, lg: 5 },
};

export const pageHeading = {
  fontWeight: 900,
  color: "#08295c",
  fontSize: { xs: "2rem", md: "2.7rem" },
  lineHeight: 1.1,
};

export const pageSubheading = {
  color: "#6b7280",
  fontSize: "1rem",
};

export const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#dbeef0",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0f23d3",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0f5bff",
      borderWidth: "2px",
    },
  },
};

export const primaryButton = {
  borderRadius: "12px",
  fontWeight: 900,
  textTransform: "none",
  py: 1.5,
  background: "linear-gradient(135deg, #0f5bff 0%, #0a3cb5 100%)",
  color: "#f5ecec",
  boxShadow: "0 12px 32px rgba(15, 91, 255, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 16px 48px rgba(15, 91, 255, 0.4)",
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    opacity: 0.75,
  },
};

export const outlineButton = {
  borderRadius: "12px",
  fontWeight: 900,
  textTransform: "none",
  borderColor: "#0f5bff",
  color: "#0f5bff",
  px: 4,
  py: 1.5,
};

export const accentCard = {
  borderRadius: "16px",
  border: "1px solid #dbe7ff",
};
