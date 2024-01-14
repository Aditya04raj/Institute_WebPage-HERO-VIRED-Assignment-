// controllers/programController.js
const db = require('../utills/db');
const programModel = require('../models/programModel');
const jwt = require('jsonwebtoken'); // Add this for JWT authentication

// Get all programs
const getAllPrograms = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM programs');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting programs:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Get one program by ID
const getProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM programs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Program not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting program by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Create a program
const createProgram = async (req, res) => {
  const { name, price, domain, program_type, registrations_status, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, duration, certificate_diploma, eligibility_criteria } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO programs (name, price, domain, program_type, registrations_status, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, duration, certificate_diploma, eligibility_criteria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [name, price, domain, program_type, registrations_status, description, placement_assurance, image_url, university_name, faculty_profile, learning_hours, duration, certificate_diploma, eligibility_criteria]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Update a program by ID
const updateProgramById = async (req, res) => {
    const { id } = req.params;
    const programData = req.body;
  
    try {
      // Check if the user is authorized to update programs (you can adjust this based on your authentication logic)
      if (req.user && req.user.role === 'admin') {
        const updatedProgram = await programModel.updateProgramById(id, programData);
  
        if (!updatedProgram) {
          return res.status(404).send('Program not found');
        }
  
        res.json(updatedProgram);
      } else {
        res.status(403).send('Not authorized to update programs');
      }
    } catch (error) {
      console.error('Error updating program:', error);
      res.status(500).send('Internal Server Error');
    }
  };
// Delete a program by ID
const deleteProgramById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM programs WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Program not found');
    }
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgramById,
  deleteProgramById,
};
