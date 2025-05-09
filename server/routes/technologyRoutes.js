// routes/technologyRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTechnologies, createTechnology } = require('../controllers/technologyController');

router.get('/', getAllTechnologies);       // Obtener todas las tecnologías
router.post('/', createTechnology);        // Crear una nueva tecnología

module.exports = router;
