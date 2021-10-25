import { MEMEAPI } from "../constants";
import axios from "axios";
import { Fragment, useState } from "react";

export default function FileDownload() {
  const [imageURL, setImageURL] = useState();
  const getFiles = () => {
    const url = MEMEAPI + "api/getTrendingMemes";
    axios
      .get(url, {
        pageNo: 0,
        pageSize: 1
      })
      .then((res) => {
        const memeList = res.data.data.TrendingMemeList;
        console.log(memeList);
        const imageData = memeList[0].MediaPath;
        console.log(imageData);
        setImageURL(MEMEAPI + "media/" + imageData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <button onClick={getFiles}>Dowload Memes</button>
      <video src={imageURL} width="200" alt="profileVid" />
      <img src={imageURL} width="200" alt="profile22" />
    </Fragment>
  );
}
