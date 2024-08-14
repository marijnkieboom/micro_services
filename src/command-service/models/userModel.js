const mariadb = require("mariadb");

let pool;

// Connect
async function connect() {
  if (!pool) {
    pool = mariadb.createPool({
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
      connectionLimit: 5,
    });
  }
}

// Get connection
async function getConnection() {
  if (!pool) await connect();
  return await pool.getConnection();
}

/**
 * Write to database
 */

async function createUser(user) {
  let connection;
  try {
    connection = await getConnection();
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    const values = [user.name, user.email];
    const result = await connection.query(query, values);
    return result.affectedRows > 0;
  } finally {
    if (connection) connection.release();
  }
}

async function updateUser(id, user) {
  let connection;
  try {
    connection = await getConnection();
    const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    const values = [user.name, user.email, id];
    const result = await connection.query(query, values);
    return result.affectedRows > 0;
  } finally {
    if (connection) connection.release();
  }
}

async function deleteUser(id) {
  let connection;
  try {
    connection = await getConnection();
    const query = "DELETE FROM users WHERE id = ?";
    const values = [id];
    const result = await connection.query(query, values);
    return result.affectedRows > 0;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Exports
 */

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
