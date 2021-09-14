import React, { useState, useEffect, Fragment, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import ImageUpload from "./ImageUpload";
import { USERAPI, MEMEAPI } from "../constants";

//TODO: Need to add error support in snackbar (bug does not close itself)
//TODO: Need to implement suggested tags which comes as a list of options on screen
/* Implemented at time of suggested tags
  useEffect(() => {
    //api will take image and give tags as output
    const url = MEMEAPI + "api/tags";
    axios
      .get(url)
      .then((result) => {
        const tagsWithMemeCount = result.data;
        let ans = "";
        for (const { tag, memeCount } of tagsWithMemeCount) {
          ans += `${tag} (${memeCount}), `;
          if (ans.length > 100) break; //don't want so much of helper text
        }
        setSuggestedTags(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); //TODO : dependency on image using ML
  */
// const [suggestedTags, setSuggestedTags] = useState(["yo,sho"]);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UploadDialog(props) {
  const { userId } = props;

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const mediaType = useRef();
  const [title, setTitle] = useState(""); //image or video
  const [tagString, setTagString] = useState("");
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [errTitle, setErrTitle] = useState(false);
  const [errTags, setErrTags] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setMediaFiles([]);
    setErrTags(false);
    setErrTitle(false);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const inspectInput = () => {
    let inputError = false;
    if (mediaFiles.length === 0) {
      inputError = true;
    }
    if (title.length === 0) {
      setErrTitle(true);
      inputError = true;
    }
    if (tagString.length === 0) {
      setErrTags(true);
      inputError = true;
    }
    return inputError;
  };

  // const getTagList = () => {
  //   const ans = tags.split(",").map((tag) => tag.trim());
  //   return ans;
  // };

  const handleUpload = async () => {
    let shouldClose = true;
    if (inspectInput()) {
      shouldClose = false;
    }
    //call to upload it to backend
    const url = MEMEAPI + "api/upload";
    console.log(url);
    const fd = new FormData();
    fd.append("mediaFile", mediaFiles[0], mediaFiles[0].name);
    fd.append("MemeTitle", title);
    fd.append("TagString", tagString);
    fd.append("UploadedBy", userId);
    fd.append("MediaType", mediaType.current);
    console.log(mediaType);
    // console.log(memeObj);
    axios
      .post(url, fd /*,{ headers: { Authorization: `Bearer ${token}` } } */)
      .then((result) => {
        console.log(result);
        console.log(result.data);
        setUploadSuccessful(true); //will be in then block
        setSnackBarOpen(true);
      })
      .catch((err) => {
        setUploadSuccessful(false);
        setSnackBarOpen(true);
        console.log(err);
      });
    setDialogOpen(!shouldClose);
  };

  return (
    <div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000} //Not auto hiding (maybe)
        onClose={handleSnackBarClose}
      >
        {uploadSuccessful ? (
          <Alert onClose={handleSnackBarClose} severity="success">
            Uploaded Successfully
          </Alert>
        ) : (
          <Alert onClose={handleSnackBarClose} severity="error">
            Upload failed!
          </Alert>
        )}
      </Snackbar>
      <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
        Upload
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload meme</DialogTitle>
        <DialogContent>
          <ImageUpload
            files={mediaFiles}
            setFiles={setMediaFiles}
            mediaType={mediaType}
          />
          {mediaFiles.length !== 0 && (
            <Fragment>
              <br />
              <TextField
                error={errTitle}
                required
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                variant="outlined"
                fullWidth
                helperText={errTitle && "Title cannot be empty"}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <TextField
                error={errTags}
                required
                margin="dense"
                id="name"
                label="Tags"
                type="text"
                variant="outlined"
                fullWidth
                helperText={errTags && "Tags cannot be empty"}
                placeholder="tag1,tag2, ..."
                onChange={(e) => setTagString(e.target.value)}
              />
            </Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            color="primary"
            disabled={mediaFiles.length === 0}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
