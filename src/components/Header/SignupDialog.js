import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { USERAPI } from "../../constants";

//TODO add slide transition
export default function SignUpDialog(props) {
  const { userId, setUserId } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [tmpUserId, setTmpUserId] = useState("");
  const [errTmpUserId, setErrTmpUserId] = useState(false);
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPass, setErrConfirmPass] = useState(false);

  const handleClickOpen = () => {};

  const forceClose = () => {
    setOpen(false);
    setErrTmpUserId(false);
    setErrPassword(false);
    setErrConfirmPass(false);
    setErrorMessage("");
  };

  //copy from Backend
  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return false;
    }
    return true;
  };

  const handleClose = () => {
    //validate userId
    let shouldClose = true;
    if (tmpUserId.length === 0) {
      setErrTmpUserId(true);
      shouldClose = false;
    }
    //validate password
    if (!validatePassword(password)) {
      setErrPassword(true);
      shouldClose = false;
    }
    //confirm password
    if (confirmPassword !== password) {
      setErrConfirmPass(true);
      shouldClose = false;
    }
    // call to backend to create new user
    if (shouldClose) {
      axios
        .post(USERAPI + "api/create", {
          UserId: tmpUserId,
          Password: password
        })
        .then((result) => {
          // console.log(result.data);
          const token = result.data.data.token;
          console.log("Token recieved", token);
          setUserId(tmpUserId);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        })
        .catch((err) => {
          const resMsg = err.response.data.message;
          if (resMsg.search("Duplicate entry") !== -1) {
            setErrorMessage("User Name already exists.");
          }
          setOpen(true);
        });
      forceClose();
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Sign Up
      </Button>
      <Dialog
        open={open}
        onClose={forceClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <p style={{ color: "#ff0000", marginTop: "0" }}>{errorMessage}</p>
          )}
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
          <br />
          <br />
          <TextField
            error={errConfirmPass}
            required
            label="Confirm Password"
            type="password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={errConfirmPass && "Password does not match!"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
