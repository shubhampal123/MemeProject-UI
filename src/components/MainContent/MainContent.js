import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TrendingPage from "./TrendingPage";
import RecommendationPage from "./RecommendationPage";
import LoginDialog from "../Header/LoginDialog";
import TestComponent from "../../test/TestComponent";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "black"
  },
  tabsTitle: {
    color: "white"
  }
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}
function videoScroll() {
  if (document.querySelectorAll("video[autoplay]").length < 0) {
    return;
  }
  const windowHeight = window.innerHeight;
  const videoEl = document.querySelectorAll("video[autoplay]");

  for (let i = 0; i < videoEl.length; i++) {
    const thisVideoEl = videoEl[i];
    const videoClientRectMid =
      thisVideoEl.getBoundingClientRect().top + thisVideoEl.clientHeight / 2;

    if (videoClientRectMid <= windowHeight && videoClientRectMid >= 0) {
      thisVideoEl.play();
    } else {
      thisVideoEl.pause();
    }
  }
}

export default function MainContent(props) {
  const { userId, setUserId } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);

  const handleChange = (event, newValue) => {
    if (newValue === 1 && !userId) {
      setOpenLogin(true);
      return;
    }
    setValue(newValue);
  };

  useEffect(() => {
    window.addEventListener("load", videoScroll);
    window.addEventListener("scroll", videoScroll);
    return () => {
      window.removeEventListener("load", videoScroll);
      window.removeEventListener("scroll", videoScroll);
    };
  });

  useEffect(() => {
    if (value === 1 && !userId) {
      //change to trending tab from recomm. tab if user logged out
      setValue(0);
    }
  }, [userId]);

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        centered
      >
        <Tab label="Trending" name="Trending" className={classes.tabsTitle} />
        <Tab
          label="Recommended"
          name="Recommended"
          className={classes.tabsTitle}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TrendingPage userId={userId} setUserId={setUserId} />
        <LoginDialog
          open={openLogin}
          setOpen={setOpenLogin}
          setUserId={setUserId}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecommendationPage userId={userId} />
      </TabPanel>
    </Paper>
  );
}
