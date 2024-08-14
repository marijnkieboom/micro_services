const express = require("express");
const bodyParser = require("body-parser");

const commandHandler = require("./handlers/commandHandler");
const createUserCommand = require("./commands/createUserCommand");
const updateUserCommand = require("./commands/updateUserCommand");
const deleteUserCommand = require("./commands/deleteUserCommand");

const app = express();
app.use(bodyParser.json());

app.post("/users", async (req, res) => {
  const command = {
    type: "CREATE_USER",
    payload: createUserCommand(req.body.name, req.body.email),
  };
  const result = await commandHandler(command);
  res.status(201).json(result);
});

app.put("/users/:id", async (req, res) => {
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

app.delete("/users/:id", async (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Command service running on port ${PORT}`);
});
