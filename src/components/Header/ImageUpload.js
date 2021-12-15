import React, { useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";

//TODO: accept only 1 file

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const closeImgButton = {
  height: "10%"
};

export default function ImageUpload(props) {
  const { files, setFiles, mediaType } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    accept: "image/* , video/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles[0]);
      console.log(acceptedFiles[0].type);
      const inpMediaType = acceptedFiles[0].type;
      if (inpMediaType.search("image") !== -1) {
        mediaType.current = "image";
      } else {
        mediaType.current = "video";
      }

      setFiles(
        acceptedFiles.map((file) => {
          console.log("Heeeee");
          console.log(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file)
          });
        })
      );
    }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragAccept, isDragReject]
  );

  const clickHandler = (fileName) => {
    return function deleteFile() {
      //delete the file whose name match
      const tmp = files.filter((file) => file.name !== fileName);
      setFiles(tmp);
    };
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {file.type.search("video") !== -1 ? (
          <video
            src={file.preview}
            style={img}
            alt={`Video file : ${file.name}`}
            autoplay
            controls
            muted
          />
        ) : (
          <img src={file.preview} style={img} alt={`file : ${file.name}`} />
        )}
        <button style={closeImgButton} onClick={clickHandler(file.name)}>
          X
        </button>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="container">
      {files.length === 0 ? (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop image or video here</p>
          <button type="button" onClick={open}>
            Select File
          </button>
        </div>
      ) : (
        <aside style={thumbsContainer}>{thumbs}</aside>
      )}
    </div>
  );
}
