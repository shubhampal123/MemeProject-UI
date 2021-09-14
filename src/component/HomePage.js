import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TrendingPage from "./TrendingPage";
import RecommendationPage from "./RecommendationPage";
import LoginDialog from "./LoginDialog";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
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

export default function HomePage(props) {
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

  return (
    <Paper class={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
      >
        <Tab label="Trending" name="Trending" />
        <Tab label="Recommended" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TrendingPage userId={userId} setUserId={setUserId} />
        <LoginDialog open={openLogin} setOpen={setOpenLogin} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RecommendationPage userId={userId} />
      </TabPanel>
    </Paper>
  );
}
