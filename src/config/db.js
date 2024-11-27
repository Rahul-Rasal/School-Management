import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection pool for non-local MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Remote MySQL host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT || 3306, // MySQL port (default is 3306)
  waitForConnections: true, // Wait for an available connection
  connectionLimit: 10, // Limit number of active connections
  queueLimit: 0, // No limit on queued requests
});

// Test the database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    console.log("MySQL Database connected successfully!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the MySQL database:", error.message);
    process.exit(1); // Exit process with failure if connection fails
  }
}

// Run the test on startup
testConnection();

// Keep the connection alive (ping every minute)
setInterval(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Keep the connection alive
    connection.release();
  } catch (error) {
    console.error("Error pinging MySQL:", error);
  }
}, 60000); // Ping every minute

// Export the connection pool
export default pool;
