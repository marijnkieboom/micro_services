const DataSource = require("../utils/dataSource");
const EventPublisher = require("../utils/eventPublisher");

/**
 * Write to database
 */

async function createUser(user) {
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  const values = [user.name, user.email];
  const result = await DataSource.query(query, values);

  if (result.affectedRows > 0) {
    console.log("User succesfully created");
    await EventPublisher.publishEvent("user.created", {
      id: result.insertId.toString(),
      ...user,
    });
    return true;
  }

  return false;
}

async function updateUser(id, user) {
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  const values = [user.name, user.email, id];
  const result = await DataSource.query(query, values);

  if (result.affectedRows > 0) {
    console.log("User succesfully updated");
    await EventPublisher.publishEvent("user.updated", { id, ...user });
    return true;
  }

  return false;
}

async function deleteUser(id) {
  const query = "DELETE FROM users WHERE id = ?";
  const values = [id];
  const result = await DataSource.query(query, values);

  if (result.affectedRows > 0) {
    console.log("User succesfully deleted");
    await EventPublisher.publishEvent("user.deleted", { id });
    return true;
  }

  return false;
}

/**
 * Exports
 */

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
