// models/userModel.js
const db = require('../utills/db');

class User {
  static async getByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const { rows } = await db.query(query, [username]);
      return rows[0];
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw error;
    }
  }

  static async create(userData) {
    try {
      const { username, password } = userData;
      const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const values = [username, password];

      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

module.exports = User;
