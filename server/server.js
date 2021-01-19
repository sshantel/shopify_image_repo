const { cloudinary } = require("./utils/cloudinary");
const express = require("express");
const app = express();

var cors = require("cors");

app.use(express.json({ limit: "100mb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.post("/api/search", async (req, res) => {
  cloudinary.search
    .expression(req.body.query)
    .with_field("tags")
    .max_results(10)
    .execute()
    .then((result) => {
      console.log(result.resources);
      res.json(result.resources);
    });
});

app.post("/api/upload", async (req, res) => {
  try {
    const imageFileString = req.body.data;
    console.log(req.body.data);
    const imageUploadedResponse = await cloudinary.uploader.upload(
      imageFileString,
      {
        upload_preset: "shopify_image_repo",
        tags: req.body.tag,
        caption: req.body.caption,
      }
    );

    console.log(imageUploadedResponse);
    res.json({ msg: "success!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "error" });
  }
});
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
