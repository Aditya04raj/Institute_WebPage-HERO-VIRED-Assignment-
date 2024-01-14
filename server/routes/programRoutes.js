// routes/programRoutes.js
const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.post('/', programController.createProgram);
router.put('/:id', programController.updateProgramById);
router.delete('/:id', programController.deleteProgramById);

module.exports = router;
