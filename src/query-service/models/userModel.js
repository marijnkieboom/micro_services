const { MongoClient, ObjectId } = require("mongodb");

let db;
const client = new MongoClient(process.env.MONGODB_URI);

// Connect
async function connect() {
  await client.connect();
  db = client.db();
}

// Get collection
async function getUsersCollection() {
  if (!db) await connect();
  return db.collection("users");
}

/**
 * Read from collection
 */

async function getUserById(id) {
  const users = await getUsersCollection();
  return await users.findOne({ _id: ObjectId.createFromHexString(id) });
}

async function getAllUsers() {
  const users = await getUsersCollection();
  return await users.find().toArray();
}

/**
 * Exports
 */

module.exports = {
  getUserById,
  getAllUsers,
};
