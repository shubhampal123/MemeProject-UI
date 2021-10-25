import { useEffect } from "react";
import axios from "axios";

export default function TestComponent() {
  // const [likeList, setLikeList] = useState([]);
  useEffect(() => {
    console.log("I am here");
    axios
      .get("www.google.com")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  });
  return <h1>Trending Page</h1>;
}
