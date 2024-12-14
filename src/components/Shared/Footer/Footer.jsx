import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: 5,
        textAlign: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Task Manager
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, fontSize: "0.875rem",  }}
          >
            Manage your tasks efficiently and stay productive.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", my: 0.5 }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", my: 0.5 }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block", my: 0.5 }}
            >
              Contact Us
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
            <IconButton href="#" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="#" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="#" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="#" color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 3, fontSize: "0.875rem" }}>
        &copy; {new Date().getFullYear()} Task Manager. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
