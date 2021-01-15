const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//add images
app.post("/albums", async (req, res) => {
  try {
    const { description } = req.body;
    const addImage = await pool.query(
      "INSERT INTO personal (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(addImage.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all images
app.get("/albums", async (req, res) => {
  try {
    const allImages = await pool.query("SELECT * FROM personal");
    res.json(allImages.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an image

app.get("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const personal = await pool.query(
      "SELECT * FROM personal WHERE image_id = $1",
      [id]
    );
    res.json(personal.rows[0]);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

//update
app.put("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("hi");
    const { description } = req.body;
    const updateImage = await pool.query(
      "UPDATE personal SET description = $1 WHERE image_id = $2",
      [description, id]
    );
    res.json("Image was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete
app.delete("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteImage = await pool.query(
      "DELETE FROM personal WHERE image_id = $1",
      [id]
    );
    res.json("image was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
