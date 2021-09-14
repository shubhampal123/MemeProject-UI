import "./styles.css";
// import LoginDialog from "./component/LoginDialog";
import SignUpDialog from "./component/SignupDialog";
import UploadDialog from "./component/UploadDialog";
import Post from "./component/Post";
// import FileUploadTest from "./test/FileUploadTest";
import FileDownloadTest from "./test/FileDownload";
import Header from "./component/Header";
import HomePage from "./component/HomePage";
import { useState } from "react";

export default function App() {
  const [userId, setUserId] = useState("");
  return (
    <div className="App">
      {/* <FileUploadTest /> */}
      {/* <FileDownloadTest /> */}
      {/* <LoginDialog />
      <br /> */}
      {/* <SignUpDialog /> */}
      {/* <UploadDialog /> */}
      {/* <Post
        userId="SampleUser1"
        meme={{
          MemeId: "sample16298222901",
          MemeTitle: "ABCD",
          MediaPath: "sample16298222901.jpg",
          TotalMemeLikeness: 40,
          ActivityCount: 10
        }}
      /> */}
      <Header userId={userId} setUserId={setUserId} />
      <HomePage userId={userId} setUserId={setUserId} />
    </div>
  );
}
