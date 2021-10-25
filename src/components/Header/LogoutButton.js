import Button from "@material-ui/core/Button";

export default function LogoutButton(props) {
  const { userId, setUserId } = props;
  const logoutUser = () => {
    console.log("Logging out", userId);
    setUserId("");
  };
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  );
}
