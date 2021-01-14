const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/albums", async (req, res) => {
  try {
    const { description } = req.body;
    const addImage = await pool.query(
      "INSERT INTO personal(description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(addImage.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/albums/:id", async (req, rest) => {
  try {
    const { id } = req.params;
    const image = await pool.query("SELECT * FROM todo WHERE image_id = $1", [
      id,
    ]);
    res.json(image.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
