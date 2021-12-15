import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { MEMEAPI, USERAPI } from "../../constants";
import LikeDislkeButton from "./LikeDislikeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 500
    },
    // maxWidth: 345,
    margin: "1%",
    border: "5px solid white",
    backgroundColor: "#FFFFFF"
  },
  media: {
    width: "100%",
    maxWidth: "500px"
  },
  likeDislikeButton: {
    padding: "8px", //TODO: Responsive css
    alignItems: "center",
    display: "flex",
    justifyContent: "space-around"
  },
  title: {
    color: "black",
    font: "10px",
    fontWeight: ""
  }
}));

//TotalMemeLikeness, activityCount
//initially - TotalMemeLikeness, activityCount, UserMemeLikeness - ok
//update - TotalMemeLikeness, activityCount, UserMemeLikeness, MemeUpdater

export default function Post(props) {
  const { meme, userId, setUserId, memeLikeVal } = props;
  const classes = useStyles();
  const [cardBackgroundColor, setCardBackgroundColor] = useState("ffffff");
  const [intensity, setIntensity] = useState("ff"); //depends on TotalMemeLikeness
  const [userMemeLikeness, setUserMemeLikeness] = useState(memeLikeVal); //--needed could be 100 ,  0, -100
  const totalLikeContainer = useRef(meme.TotalMemeLikeness);
  const activityCntContainer = useRef(meme.AllUsersMemeActivityCount);

  //blink the card
  //set the intesity and color
  //make the call to backend --> in use effect
  useEffect(() => {
    //make axios call to get UserMemeLikeness
    console.log("Inside initial call");
    // console.log(`${MEMEAPI}media/${meme.MediaPath}`);
    // console.log(meme);
    setUserMemeLikeness(memeLikeVal);
    if (!userId) {
      console.log("No user logged in");
      return;
    }
    console.log("type:", typeof memeLikeVal);
  }, [userId, memeLikeVal]);

  return (
    <Card
      className={classes.root}
      style={{ borderColor: "#" + cardBackgroundColor + intensity }}
    >
      <CardActionArea>
        Total: {totalLikeContainer.current}, ActivityCount:{" "}
        {activityCntContainer.current}
        {", "}
        Likeness: {userMemeLikeness}
        <CardContent>
          <Typography className={classes.title}>{meme.MemeTitle}</Typography>

          {meme.MediaType === "image" ? (
            <img
              src={`${MEMEAPI}media/${meme.MediaPath}`}
              width="350"
              alt="memeImage"
            />
          ) : (
            <video
              src={`${MEMEAPI}media/${meme.MediaPath}`}
              width="100%"
              alt="memeVideo"
              autoPlay
              muted
              controls
            />
          )}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.likeDislikeButton}>
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
