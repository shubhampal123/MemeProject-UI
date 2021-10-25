import { useState } from "react";
import Button from "@material-ui/core/Button";
import LoginDialog from "./LoginDialog";

export default function LoginButton(props) {
  const { setUserId, setLoginSuccessful, setSnackBarOpen } = props;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Login
      </Button>
      <LoginDialog
        setUserId={setUserId}
        open={open}
        setOpen={setOpen}
        setLoginSuccessful={setLoginSuccessful}
        setSnackBarOpen={setSnackBarOpen}
      />
    </div>
  );
}
