import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { MEMEAPI, USERAPI } from "../constants";
import LikeDislkeButton from "./LikeDislikeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 345
    },
    // maxWidth: 345,
    margin: "1%"
  },
  media: {
    width: "100%",
    maxWidth: "345px"
  },
  likeDislikeButton: {
    padding: "8px", //TODO: Responsive css
    alignItems: "center",
    display: "flex",
    justifyContent: "space-around"
  }
}));

//TotalMemeLikeness, activityCount
//initially - TotalMemeLikeness, activityCount, UserMemeLikeness - ok
//update - TotalMemeLikeness, activityCount, UserMemeLikeness, MemeUpdater

export default function Post(props) {
  const { meme, userId, setUserId } = props;
  const classes = useStyles();
  const [cardBackgroundColor, setCardBackgroundColor] = useState("ffffff");
  const [intensity, setIntensity] = useState("ff"); //depends on TotalMemeLikeness
  const [userMemeLikeness, setUserMemeLikeness] = useState(0); //--needed could be 100 ,  0, -100
  const totalLikeContainer = useRef(meme.TotalMemeLikeness);
  const activityCntContainer = useRef(meme.ActivityCount);

  //blink the card
  //set the intesity and color
  //make the call to backend --> in use effect
  useEffect(() => {
    //make axios call to get UserMemeLikeness
    console.log("Inside initial call");
    // console.log(`${MEMEAPI}media/${meme.MediaPath}`);
    if (!userId) {
      console.log("No user logged in");
      return;
    }
    axios
      .post(MEMEAPI + "api/memeLikeness", {
        UserId: userId,
        MemeIdList: [meme.MemeId]
      })
      .then((res) => {
        //set usermemelikeness
        const tmp = res.data.data;
        console.log(tmp);
        if (tmp.length !== 0) {
          // setUserMemeLikeness(res.data[0]); and activity count
          setUserMemeLikeness(tmp[0].UserMemeLikeness);
          console.log(userMemeLikeness);
        }
      })
      .catch((err) => {
        console.log("get meme likeness " + err);
      });
  }, [userId]);

  return (
    <Card
      className={classes.root}
      style={{ background: "#" + cardBackgroundColor + intensity }}
    >
      <CardActionArea>
        Total: {totalLikeContainer.current}, ActivityCount:{" "}
        {activityCntContainer.current}
        {", "}
        Likeness: {userMemeLikeness}
        <CardContent>
          <Typography>{meme.MemeTitle}</Typography>

          {/* <CardMedia
            //We get BLob input which can be converted to URL so it should work
            className={classes.media}
            // image="./Cat.jpg"
            src={`${MEMEAPI}media/${meme.MediaPath}`}
            title="Contemplative Reptile"
          /> */}

          {meme.MediaType === "image" ? (
            <img
              src={`${MEMEAPI}media/${meme.MediaPath}`}
              width="200"
              alt="memeImage"
            />
          ) : (
            <video
              src={`${MEMEAPI}media/${meme.MediaPath}`}
              width="100%"
              alt="memeVideo"
              autoplay
              controls
            />
          )}
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions class={classes.likeDislikeButton}>
        <LikeDislkeButton
          userMemeLikeness={userMemeLikeness}
          setUserMemeLikeness={setUserMemeLikeness}
          setCardBackgroundColor={setCardBackgroundColor}
          setIntensity={setIntensity}
          meme={meme}
          userId={userId}
          setUserId={setUserId}
          totalLikeContainer={totalLikeContainer}
          activityCntContainer={activityCntContainer}
        />
      </CardActions>
    </Card>
  );
}
