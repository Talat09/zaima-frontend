import { useContext } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  console.log(auth);
  return (
    <AppBar position="sticky" sx={{ mb: 2, borderRadius: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Management App
        </Typography>
        {auth ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "white" }}>Dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "white" }}>Login</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "white" }}>Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
