import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { USERAPI } from "../constants";
import axios from "axios";
//TODO add feature of reCaptcha

export default function LoginDialog(props) {
  const { setUserId, open, setOpen } = props;

  const [tmpUserId, setTmpUserId] = useState("");
  const [errTmpUserId, setTmpErrUserId] = useState(false);
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);

  const forceClose = () => {
    setOpen(false);
    setTmpErrUserId(false);
    setErrPassword(false);
  };

  const handleLogin = () => {
    let shouldClose = true;
    if (!tmpUserId) {
      setTmpErrUserId(true);
      shouldClose = false;
    }
    if (!password) {
      setErrPassword(true);
      shouldClose = false;
    }
    if (shouldClose) {
      axios
        .post(USERAPI + "api/login", {
          UserId: tmpUserId,
          Password: password
        })
        .then((result) => {
          console.log(result.data.data);
          const token = result.data.data.token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setUserId(tmpUserId);
        })
        .catch((err) => {
          setUserId("");
          console.log("Login failed : " + err);
        });
      forceClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={forceClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <TextField
          error={errTmpUserId}
          required
          id="standard-required"
          label="User Name"
          variant="outlined"
          onChange={(e) => setTmpUserId(e.target.value)}
          helperText={errTmpUserId && "User Name should be non-empty string!"}
        />
        <br />
        <br />
        <TextField
          error={errPassword}
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          helperText={errPassword && "Password must contain atleat 8 chars!"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
