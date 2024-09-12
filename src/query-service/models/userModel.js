const { MongoClient, ObjectId } = require("mongodb");

let db;
const client = new MongoClient(process.env.MONGODB_URI);

async function connect() {
  await client.connect();
  db = client.db();
}

async function getUsersCollection() {
  if (!db) await connect();
  return db.collection("users");
}

/**
 * Read from collection
 */

async function getUserById(id) {
  console.log("Query user with id:" + id);
  const users = await getUsersCollection();
  return await users.findOne({ _id: id });
}

async function getAllUsers() {
  console.log("Query all users");
  const users = await getUsersCollection();
  return await users.find().toArray();
}

/**
 * Event based updates to collection
 */

async function createUser(id, name, email) {
  const users = await getUsersCollection();
  const result = await users.insertOne({ _id: id, name, email });
  return result.acknowledged;
}

async function updateUser(id, name, email) {
  const users = await getUsersCollection();
  const result = await users.updateOne({ _id: id }, { $set: { name, email } });
  return result.acknowledged;
}

async function deleteUser(id) {
  const users = await getUsersCollection();
  const result = await users.deleteOne({ _id: id });
  return result.acknowledged;
}

/**
 * Exports
 */

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
