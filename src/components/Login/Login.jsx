import { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/register" : "/login";
      const { data } = await axios.post(
        `http://localhost:3000/api/auth${endpoint}`,
        { username, password }
      );
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } catch (err) {
      console.error("Error:", err.response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <Typography variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>
        <Button
          onClick={() => setIsRegister(!isRegister)}
          fullWidth
          sx={{ mt: 1 }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Need an account? Register"}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
