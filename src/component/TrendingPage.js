import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";
import { MEMEAPI } from "../constants";

const createDummyMeme = (title, likeValue, count) => {
  return {
    MemeId: new Date().getTime(),
    MemeTitle: title,
    MediaPath: "default xyz",
    TotalMemeLikeness: likeValue,
    ActivityCount: count
  };
};

const dummyMemeList = [
  createDummyMeme("Title 1", 30, 2),
  createDummyMeme("Title 2", 30, 10),
  createDummyMeme("Title 3", 310, 200),
  createDummyMeme("Title 4", 130, 20),
  createDummyMeme("Title 5", 300, 15),
  createDummyMeme("Title 6", 250, 10)
];

/* Fetch memes from backend and pass it Post */
export default function TrendingPage(props) {
  const { userId, setUserId } = props;
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    if (!userId) {
      axios
        .get(MEMEAPI + "api/getTrendingMemes", {
          pageNo: 0,
          pageSize: 0
        })
        .then((res) => {
          console.log(res.data);
          setMemes(res.data.data.TrendingMemeList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const memeList = memes.map((meme) => (
    <Post userId={userId} meme={meme} setUserId={setUserId} />
  ));

  return <div class="trendingPage">{memeList}</div>;
}
