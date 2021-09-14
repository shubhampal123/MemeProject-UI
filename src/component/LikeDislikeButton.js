import { useState } from "react";
import Button from "@material-ui/core/Button";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownIconOutlined from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { USERAPI, MEMEAPI, CARD_BLINK_TIME } from "../constants";
import LoginDialog from "./LoginDialog";

export default function LikeDislikeButton(props) {
  const {
    userMemeLikeness,
    setUserMemeLikeness,
    setCardBackgroundColor,
    setIntensity,
    meme,
    userId,
    setUserId,
    totalLikeContainer,
    activityCntContainer
  } = props;
  const likeColorHex = "00ff00";
  const dislikeColorHex = "ff0000";

  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    //call user micro service for update
    console.log("Inside update call");
    console.log(userId);
    const payLoad = {
      UserId: userId,
      MemeId: meme.MemeId,
      NewMemeLikeness: userMemeLikeness,
      CategoryIdList: ["category1", "category2"]
    };
    axios
      .put(USERAPI + "api/userPreferenceUpdater", payLoad)
      .then((res) => {
        console.log(res);
        console.log("Updated User Preference successfully");
      })
      .catch((err) => {
        console.log("Error in update call");
        console.log(err);
      });
  }, [userMemeLikeness]);

  const handleLikeDislike = (isLike) => {
    return () => {
      if (!userId) {
        setOpenLogin(true);
        return;
      }
      if (
        (userMemeLikeness > 0 && isLike) ||
        (userMemeLikeness < 0 && !isLike)
      ) {
        console.log("Already " + (isLike ? "liked" : "disliked"));
        return;
      }

      const likeValue = isLike ? 100 : -100;
      setCardBackgroundColor(isLike ? likeColorHex : dislikeColorHex);
      setIntensity("ff"); //100%
      setTimeout(() => {
        totalLikeContainer.current += likeValue - userMemeLikeness; //check if old and new is smae
        if (userMemeLikeness === 0) {
          activityCntContainer.current += 1;
        }
        setUserMemeLikeness(likeValue);
        setCardColorAndIntensity(
          totalLikeContainer.current,
          activityCntContainer.current
        );
      }, CARD_BLINK_TIME);
    };
  };

  //number.toString(16) --> decimal to hex
  //intenisty range = 0 - 255 (y)
  //likeness range = -100 - 100 (x)
  //y-0 = (255/200)(x+100)
  const likenessToIntesityHex = (likeness) => {
    const tmp = Math.round((likeness + 100) * 1.275);
    return tmp.toString(16);
  };

  const setCardColorAndIntensity = (totalMemeLikeness, activityCount) => {
    const colorHex = totalMemeLikeness > 0 ? likeColorHex : dislikeColorHex;
    const intensityHex = likenessToIntesityHex(
      totalMemeLikeness / activityCount
    );
    setCardBackgroundColor(colorHex);
    setIntensity(intensityHex);
  };

  return (
    <Fragment>
      <Button size="small" color="primary" onClick={handleLikeDislike(true)}>
        {userMemeLikeness > 0 ? <ThumbUpAltIcon /> : <ThumbUpAltIconOutlined />}
      </Button>
      <Button size="small" color="primary" onClick={handleLikeDislike(false)}>
        {userMemeLikeness < 0 ? <ThumbDownIcon /> : <ThumbDownIconOutlined />}
      </Button>
      <LoginDialog
        setUserId={setUserId}
        open={openLogin}
        setOpen={setOpenLogin}
      />
    </Fragment>
  );
}
