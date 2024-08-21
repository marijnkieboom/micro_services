const userModel = require("../models/userModel");

async function handleUserCreated(event) {
  console.log("User Created Event:", event);

  const { id, name, email } = event;
  await userModel.createUser(id, name, email);
}

async function handleUserUpdated(event) {
  console.log("User Updated Event:", event);

  const { id, name, email } = event;
  await userModel.updateUser(id, name, email);
}

async function handleUserDeleted(event) {
  console.log("User Deleted Event:", event);

  const { id } = event;
  await userModel.deleteUser(id);
}

module.exports = {
  handleUserCreated,
  handleUserUpdated,
  handleUserDeleted,
};
