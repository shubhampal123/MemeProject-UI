import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";

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
  createDummyMeme("Recomended Meme Title 1", 30, 2),
  createDummyMeme("Recomended Meme Title 2", 30, 10),
  createDummyMeme("Recomended Meme Title 3", 310, 200),
  createDummyMeme("Recomended Meme Title 4", 130, 20),
  createDummyMeme("Recomended Meme Title 5", 300, 15),
  createDummyMeme("Recomended Meme Title 6", 250, 10)
];

/* Fetch memes from backend and pass it Post */
export default function RecommendationPage(props) {
  const { userId } = props;
  const [memes, setMemes] = useState(dummyMemeList);

  useEffect(() => {
    //Get recommendation for user
    // axios
    //   .get("https://MemeProject-1.kopwer.repl.co/api/fetchTrendingMemes", {
    //     UserId: userId
    //   })
    //   .then((res) => {
    //     setMemes(res.data.favMemes);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });

  const memeList = memes.map((meme) => <Post userId={userId} meme={meme} />);

  return <div class="recommendationPage">{memeList}</div>;
}
