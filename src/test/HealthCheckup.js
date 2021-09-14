import axios from "axios";
import { useEffect, Fragment } from "react";
import { USERAPI, MEMEAPI } from "../constants";

export default function HealthCheckup() {
  const testMicro = (microName) => () => {
    const baseUrl = microName === "Meme" ? MEMEAPI : USERAPI;
    console.log(baseUrl);
    axios
      .get(baseUrl + "health")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {});
  return (
    <Fragment>
      <button onClick={testMicro("Meme")}>Test MemeMicro</button>
      <button onClick={testMicro("User")}> Test UserMicro</button>
    </Fragment>
  );
}
