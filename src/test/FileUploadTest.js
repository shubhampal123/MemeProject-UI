import axios from "axios";
import { useEffect, Fragment, useState } from "react";
import { USERAPI, MEMEAPI } from "../constants";

//TODO: Test for video
export default function FileUploadTest() {
  const [image, setImage] = useState();
  const changeHandle = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const uploadImage = () => {
    const url = MEMEAPI + "api/upload";
    const fd = new FormData();
    fd.append("image", image, image.name);
    fd.append("MemeTitle", "124");
    fd.append("UploadedBy", "Sample");
    // {
    //   MemeTitle: "124",
    //   UploadedBy: "Sample",
    //   TagList: ["tag1", "tag2"],
    fd.append("TagList", ["tag1", "tag2"]);
    axios
      .post(url, fd)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(fd);
  };

  useEffect(() => {});
  return (
    <Fragment>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={changeHandle}
      ></input>
      <br />
      <br />
      <button onClick={uploadImage}>Upload</button>
    </Fragment>
  );
}
