const userModel = require("../models/userModel");

async function commandHandler(command) {
  switch (command.type) {
    case "CREATE_USER":
      return await userModel.createUser(command.payload);
    case "UPDATE_USER":
      return await userModel.updateUser(command.payload.id, command.payload);
    case "DELETE_USER":
      return await userModel.deleteUser(command.payload.id);
    default:
      throw new Error("Unknown command type");
  }
}

module.exports = commandHandler;
