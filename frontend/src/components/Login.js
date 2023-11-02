import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/action/authAction";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employee_id, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (event) => {
    event.preventDefault();
    dispatch(
      loginRequest({
        formInput: { employee_id, password },
        callback: () => navigate("/task"),
      })
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="div"
        align="center"
        sx={{ marginTop: "1rem" }}
      >
        Task Manager
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        sx={{ margin: "1rem 0" }}
        startIcon={<AccountCircleIcon />}
      >
        Login To Your Account
      </Button>
      <form onSubmit={logIn}>
        <TextField
          id="employee_id"
          name="employee_id"
          label="Employee ID"
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
          InputProps={{
            startAdornment: <AccountCircleIcon style={{ color: "gray" }} />,
          }}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: "1rem" }}
          InputProps={{
            startAdornment: <LockIcon style={{ color: "gray" }} />,
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: "1rem" }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
