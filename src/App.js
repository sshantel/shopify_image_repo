import React from "react";
import "./App.css";
import SearchPhotos from "./components/searchPhotos";
import FileUploader from "./components/fileUploader";

require("dotenv").config();

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="header"> Shopify Image Repository </h1>
        <h1 className="upload"> Upload file to image repository</h1>
        <FileUploader />
        <h1 className="title">Search for an image</h1>
        <SearchPhotos />
      </div>
    </div>
  );
}
export default App;
