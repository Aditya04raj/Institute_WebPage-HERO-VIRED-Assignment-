// models/programModel.js
const db = require('../utills/db');


class Program {
  static async getAll() {
    const query = 'SELECT * FROM programs';
    const { rows } = await db.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM programs WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async create(programData) {
    const {
      name,
      price,
      domain,
      program_type,
      registrations_status,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile,
      learning_hours,
      duration,
      certificate_diploma,
      eligibility_criteria,
    } = programData;

    const query =
      'INSERT INTO programs (name, price, domain, program_type, registrations_status, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, duration, certificate_diploma, eligibility_criteria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';

    const values = [
      name,
      price,
      domain,
      program_type,
      registrations_status,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile,
      learning_hours,
      duration,
      certificate_diploma,
      eligibility_criteria,
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async update(id, programData) {
    const {
      name,
      price,
      domain,
      program_type,
      registrations_status,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile,
      learning_hours,
      duration,
      certificate_diploma,
      eligibility_criteria,
    } = programData;

    const query =
      'UPDATE programs SET name = $1, price = $2, domain = $3, program_type = $4, registrations_status = $5, description = $6, placement_assurance = $7, image_url = $8, university_name = $9, faculty_profile = $10, learning_hours = $11, duration = $12, certificate_diploma = $13, eligibility_criteria = $14 WHERE id = $15 RETURNING *';

    const values = [
      name,
      price,
      domain,
      program_type,
      registrations_status,
      description,
      placement_assurance,
      image_url,
      university_name,
      faculty_profile,
      learning_hours,
      duration,
      certificate_diploma,
      eligibility_criteria,
      id,
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async remove(id) {
    const query = 'DELETE FROM programs WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    
    // Returning the deleted program data is optional, you can modify it based on your needs
    return rows[0];
  }
}

module.exports = Program;
