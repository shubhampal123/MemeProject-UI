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
    console.log("TrendingPage");
    axios
      .post(MEMEAPI + "api/getTrendingMemes", {
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
      key={"T" + meme.MemeId + idx}
      userId={userId}
      meme={meme}
      setUserId={setUserId}
      memeLikeVal={memeLikeMap.get(meme.MemeId)}
    />
  ));

  return <div className="trendingPage">{memeList}</div>;
}
