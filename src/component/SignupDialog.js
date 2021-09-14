import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { USERAPI } from "../constants";

//TODO add slide transition
export default function SignUpDialog(props) {
  const { userId, setUserId } = props;
  const [open, setOpen] = useState(false);
  const [tmpUserId, setTmpUserId] = useState("");
  const [errTmpUserId, setErrTmpUserId] = useState(false);
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errConfirmPass, setErrConfirmPass] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setErrTmpUserId(false);
    setErrPassword(false);
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
    console.log(USERAPI);
    if (shouldClose) {
      axios
        .post(USERAPI + "api/create", {
          UserId: tmpUserId,
          Password: password
        })
        .then((result) => {
          //set token in header
          console.log(result.data.data.token);
          //TODO: on successful signup setUserID
          setUserId(tmpUserId);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setOpen(!shouldClose);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
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
          <br />
          <br />
          <TextField
            error={errConfirmPass}
            required
            label="Confirm Password"
            type="Password"
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={errPassword && "Password does not match!"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
