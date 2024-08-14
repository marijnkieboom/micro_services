const express = require("express");
const bodyParser = require("body-parser");

const queryHandler = require("./handlers/queryHandler");
const getUserQuery = require("./queries/getUserQuery");
const getAllUsersQuery = require("./queries/getAllUsersQuery");

const app = express();
app.use(bodyParser.json());

app.get("/users/:id", async (req, res) => {
  const query = {
    type: "GET_USER",
    payload: getUserQuery(req.params.id),
  };
  const result = await queryHandler(query);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/users", async (req, res) => {
  const query = {
    type: "GET_ALL_USERS",
    payload: getAllUsersQuery(),
  };
  const result = await queryHandler(query);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Query service running on port ${PORT}`);
});
