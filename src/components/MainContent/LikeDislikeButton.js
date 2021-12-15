import { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownIconOutlined from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { USERAPI, MEMEAPI, CARD_BLINK_TIME } from "../../constants";
import LoginDialog from "../Header/LoginDialog";

//number.toString(16) --> decimal to hex
//intenisty range = 0 - 255 (y)
//likeness range = 0 - 100 (x)
//y-0 = (255/200)(x+100)
const likenessToIntesityHex = (likeness) => {
  likeness = Math.min(likeness, 100);
  likeness = Math.max(likeness, 0);
  const tmp = Math.round(likeness * 2.55);
  if (tmp === 0) return "00";
  return tmp.toString(16);
};

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
  const oldMemeLikeContainer = useRef(userMemeLikeness);

  useEffect(() => {
    //call user micro service for update
    console.log("Inside update call");
    setCardColorAndIntensity(
      totalLikeContainer.current,
      activityCntContainer.current
    );
    if (!oldMemeLikeContainer.current) {
      console.log("Just logged in");
      oldMemeLikeContainer.current = userMemeLikeness;
      return;
    }
    if (!userId) {
      console.log("No user logged in", userMemeLikeness);
      return;
    }
    const payLoad = {
      UserId: userId,
      MemeId: meme.MemeId,
      OldMemeLikeness: oldMemeLikeContainer.current,
      NewMemeLikeness: userMemeLikeness
    };
    axios
      .post(MEMEAPI + "api/likeMeme", payLoad)
      .then((res) => {
        console.log(res.data.data.message);
      })
      .catch((err) => {
        console.log("Error in update call");
        console.log(err);
      });
  }, [userMemeLikeness]);

  const handleLikeDislike = (isLike) => {
    return () => {
      if (!userId) {
        console.log("You need to log in first");
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
      setCardBackgroundColor(isLike > 0 ? likeColorHex : dislikeColorHex);
      setIntensity("ff"); //100%
      setTimeout(() => {
        totalLikeContainer.current += likeValue - userMemeLikeness; //check if old and new is smae
        if (userMemeLikeness === 0) {
          activityCntContainer.current += 1;
        }
        oldMemeLikeContainer.current = userMemeLikeness;
        setUserMemeLikeness(likeValue); //setting the likeness before the axios call
      }, CARD_BLINK_TIME);
    };
  };

  const setCardColorAndIntensity = (totalMemeLikeness, activityCount) => {
    console.log(
      "Inside setCardColorAndIntensity",
      totalMemeLikeness,
      activityCount
    );
    const colorHex = totalMemeLikeness > 0 ? likeColorHex : dislikeColorHex;
    const intensityHex = likenessToIntesityHex(
      Math.abs(totalMemeLikeness) / activityCount
    );
    console.log(colorHex + " " + intensityHex);
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
