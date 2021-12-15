import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

/*
Code to be written in parent component

const [files, setFiles] = useState([]);
const addFile = (file) => {
  console.log("Inside add file");
  console.log(file);
  const tmp = file.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file)
    })
  );
  setFiles(tmp);
};

<ImageUpload addFile={addFile} files={files} />*/

// for profile picture
export default function ImageUpload(props) {
  const { files, addFile } = props;

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    addFile(acceptedFiles);
    console.log(acceptedFiles[0].preview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbsContainer = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    objectPosition: "center"
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {Object.keys(files).length !== 0 ? (
        <img style={thumbsContainer} src={files[0].preview} alt="profile" />
      ) : (
        <p className="hello">+ image here to prompt users to click</p>
      )}
    </div>
  );
}
