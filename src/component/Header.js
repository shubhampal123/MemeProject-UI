import SignUpDialog from "./SignupDialog";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Typography from "@material-ui/core/Typography";
import UploadDialog from "./UploadDialog";

export default function Header(props) {
  const { userId, setUserId } = props;
  return (
    <div class="header">
      <div class="headerTitle">
        <Typography variant="h4">Meme Project</Typography>
      </div>
      <div class="headerButtons">
        {!userId && <SignUpDialog userId={userId} setUserId={setUserId} />}
        {!userId && <LoginButton setUserId={setUserId} />}
        {userId && <Typography>Hi, {userId}</Typography>}
        {userId && <UploadDialog userId={userId} />}
        {userId && <LogoutButton userId={userId} setUserId={setUserId} />}
      </div>
    </div>
  );
}
