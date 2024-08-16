const mariadb = require("mariadb");

class DataSource {
  constructor() {
    this.pool = null;
  }

  // Connect to MariaDB and create a connection pool
  async connect() {
    if (!this.pool) {
      this.pool = mariadb.createPool({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE,
        connectionLimit: 5,
      });
    }
  }

  // Get a connection from the pool
  async getConnection() {
    if (!this.pool) {
      await this.connect();
    }
    return await this.pool.getConnection();
  }

  // Execute a query
  async query(sql, params) {
    let connection;
    try {
      connection = await this.getConnection();
      return await connection.query(sql, params);
    } finally {
      if (connection) connection.release();
    }
  }

  // Close the connection pool
  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

module.exports = new DataSource();
