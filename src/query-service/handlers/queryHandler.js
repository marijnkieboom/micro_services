const userModel = require("../models/userModel");

async function queryHandler(query) {
  switch (query.type) {
    case "GET_USER":
      return await userModel.getUserById(query.payload.id);
    case "GET_ALL_USERS":
      return await userModel.getAllUsers();
    default:
      throw new Error("Unknown query type");
  }
}

module.exports = queryHandler;
