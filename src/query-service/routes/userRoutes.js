const express = require("express");
const queryHandler = require("../handlers/queryHandler");
const getUserQuery = require("../queries/getUserQuery");
const getAllUsersQuery = require("../queries/getAllUsersQuery");

const router = express.Router();

router.get("/:id", async (req, res) => {
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

router.get("/", async (req, res) => {
  const query = {
    type: "GET_ALL_USERS",
    payload: getAllUsersQuery(),
  };
  const result = await queryHandler(query);
  res.json(result);
});

module.exports = router;
