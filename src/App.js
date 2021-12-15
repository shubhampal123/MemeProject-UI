import "./styles.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import { useState } from "react";

export default function App() {
  const [userId, setUserId] = useState("");
  return (
    <div className="App">
      <Header userId={userId} setUserId={setUserId} />
      <MainContent userId={userId} setUserId={setUserId} />
    </div>
  );
}
