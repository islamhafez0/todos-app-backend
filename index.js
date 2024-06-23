require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/todos");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const dataBaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/todos", router);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
