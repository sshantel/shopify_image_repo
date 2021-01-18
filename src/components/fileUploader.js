import React, { useState } from "react";

export default function FileUploader() {
  const [previewImage, setPreviewImage] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [tag, setTag] = useState("");

  const handleFileInputChange = (e) => {
    console.log(e);
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewImage(reader.result);
  };

  const handleSubmitFile = (e) => {
    alert("Your file has been added to the repository!");
    e.preventDefault();
    console.log("submitted");
    if (!previewImage) return;
    uploadImage(previewImage);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage, tag: tag }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        Add tag to image
        <input
          type="text"
          name="tag"
          className="form-input"
          onChange={(e) => setTag(e.target.value)}
        />
        <button className="btn" type="submit ">
          {" "}
          Submit{" "}
        </button>
      </form>
      {previewImage && <img src={previewImage} />}
    </div>
  );
}
