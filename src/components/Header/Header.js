import { useEffect, useState } from "react";
import SignUpDialog from "./SignupDialog";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Typography from "@material-ui/core/Typography";
import UploadDialog from "./UploadDialog";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    color: "white"
  },
  user: {
    color: "white",
    paddingRight: "10px",
    paddingTop: "5px"
  }
});

export default function Header(props) {
  const { userId, setUserId } = props;
  const classes = useStyles();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <div className="header">
      <div className="headerTitle">
        <Typography variant="h4" className={classes.title}>
          Memes
        </Typography>
      </div>
      <div className="headerButtons">
        {!userId && <SignUpDialog userId={userId} setUserId={setUserId} />}
        {!userId && (
          <LoginButton
            setUserId={setUserId}
            setLoginSuccessful={setLoginSuccessful}
            setSnackBarOpen={setSnackBarOpen}
          />
        )}
        {userId && (
          <Typography className={classes.user}>Hi, {userId}</Typography>
        )}
        {userId && <UploadDialog userId={userId} />}
        {userId && <LogoutButton userId={userId} setUserId={setUserId} />}
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        {loginSuccessful ? (
          <Alert onClose={handleSnackBarClose} severity="success">
            Logged in successfully
          </Alert>
        ) : (
          <Alert onClose={handleSnackBarClose} severity="error">
            Login failed!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
