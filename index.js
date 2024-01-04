// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("mycities-project/dist"));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
