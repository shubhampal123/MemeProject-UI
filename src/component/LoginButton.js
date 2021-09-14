import { useState } from "react";
import Button from "@material-ui/core/Button";
import LoginDialog from "./LoginDialog";

export default function LoginButton(props) {
  const { setUserId } = props;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Login
      </Button>
      <LoginDialog setUserId={setUserId} open={open} setOpen={setOpen} />
    </div>
  );
}
