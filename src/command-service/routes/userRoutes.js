const express = require("express");
const commandHandler = require("../handlers/commandHandler");
const createUserCommand = require("../commands/createUserCommand");
const updateUserCommand = require("../commands/updateUserCommand");
const deleteUserCommand = require("../commands/deleteUserCommand");

const router = express.Router();

router.post("/", async (req, res) => {
  const command = {
    type: "CREATE_USER",
    payload: createUserCommand(req.body.name, req.body.email),
  };
  const result = await commandHandler(command);
  res.status(201).json(result);
});

router.put("/:id", async (req, res) => {
  const command = {
    type: "UPDATE_USER",
    payload: updateUserCommand(req.params.id, req.body.name, req.body.email),
  };
  const result = await commandHandler(command);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const command = {
    type: "DELETE_USER",
    payload: deleteUserCommand(req.params.id),
  };
  const result = await commandHandler(command);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
