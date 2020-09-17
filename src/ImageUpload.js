import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  //   const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //   get a ref to this folder images - image.name is the file selected then put it.
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      // showing progress as it uploads
      "state_changed",
      (snapshot) => {
        // progress function ..
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(`Progressss....${progress}`);
      },
      (error) => {
        //   error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //   Complete function ...ab
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) =>
            // post inside the db
            db.collection("posts").add({
              // for sorting
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            })
          );
        // Once done reset
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="imageupload">
      {/* have the following */}
      {/* Caption Input */}
      {/* File Picker */}
      {/* post button */}
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      {/* file picker */}
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
