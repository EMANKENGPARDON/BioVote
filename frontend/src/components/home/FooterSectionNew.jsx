import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import { Heart } from "lucide-react";

function FooterSectionNew() {
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Security", "Pricing", "API Docs"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Press", "Careers"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "License", "Security"],
    },
  ];

  return (
    <Box
      sx={{
        mt: { xs: 12, md: 16 },
        pt: { xs: 6, md: 8 },
        background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
        color: "white",
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          px: 3,
        }}
      >
        <Grid container spacing={5} sx={{ mb: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #0f5bff 0%, #00d084 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 900,
                  }}
                >
                  B
                </Box>
                <Box>
                  <Typography fontWeight={900} fontSize="1.2rem">
                    BioVote
                  </Typography>
                  <Typography fontSize="0.75rem" color="#9ca3af">
                    Secure Voting Platform
                  </Typography>
                </Box>
              </Box>
              <Typography color="#d1d5db" fontSize="0.95rem" sx={{ mb: 3, maxWidth: "280px" }}>
                Transforming elections with biometric security and transparent voting technology.
              </Typography>
            </Box>
          </Grid>

          {/* Links */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={2.67} key={section.title}>
              <Typography fontWeight={800} mb={2.5} fontSize="0.95rem">
                {section.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link}
                    href="#"
                    sx={{
                      color: "#9ca3af",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      transition: "all 0.3s ease",

                      "&:hover": {
                        color: "#0f5bff",
                      },
                    }}
                  >
                    {link}
                  </MuiLink>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pb: 4,
          }}
        >
          <Typography color="#9ca3af" fontSize="0.9rem">
            © {year} BioVote. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#9ca3af" }}>
            <Typography fontSize="0.9rem">Made with</Typography>
            <Heart size={16} fill="#ef4444" color="#ef4444" />
            <Typography fontSize="0.9rem">for secure voting</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FooterSectionNew;
