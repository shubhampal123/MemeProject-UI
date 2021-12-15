import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";
import { USERAPI, MEMEAPI } from "../../constants";

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
  const [memes, setMemes] = useState([]);
  const [memeLikeMap, setMemeLikeMap] = useState(new Map());

  function getUserMemeLikeness(memeIdList) {
    if (!userId) {
      console.log("No User => No user meme likeness");
      setMemeLikeMap(new Map());
      return;
    }
    axios
      .post(USERAPI + "api/memeLikeness", {
        UserId: userId,
        MemeIdList: memeIdList
      })
      .then((res) => {
        const memeIdLikeValList = res.data.data;
        console.log(memeIdLikeValList);
        const tmp = new Map();
        for (let { MemeId, UserMemeLikeness } of memeIdLikeValList) {
          console.log(MemeId, UserMemeLikeness);
          tmp.set(MemeId, UserMemeLikeness);
        }
        setMemeLikeMap(tmp);
      })
      .catch((err) => {
        console.log("get meme likeness " + err);
      });
  }

  useEffect(() => {
    // Get recommendation for user
    if (!userId) {
      return; //no user => no recommedation
    }
    console.log("Recommended", userId);
    axios
      .post(MEMEAPI + "api/getRecommendedMemes", {
        UserId: userId,
        pageNo: 1,
        pageSize: 1
      })
      .then((res) => {
        const memeListTmp = res.data.data;
        console.log(memeListTmp);
        setMemes(memeListTmp);
        const memeIdList = memeListTmp.map((meme) => meme.MemeId);
        getUserMemeLikeness(memeIdList);
      })
      .catch((err) => {
        console.log(err);
        setMemeLikeMap(new Map());
      });
  }, [userId]);

  const memeList = memes.map((meme, idx) => (
    <Post
      key={"R" + meme.MemeId + idx}
      userId={userId}
      meme={meme}
      memeLikeVal={memeLikeMap.get(meme.MemeId)}
    />
  ));

  return <div className="recommendationPage">{memeList}</div>;
}
