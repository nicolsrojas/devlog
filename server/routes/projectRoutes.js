// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Middlewares (aquí podría ir el middleware de autenticación)
const { isAuthenticated } = require('../middlewares/auth');

// 📌 Rutas para manejar proyectos
router.get('/', isAuthenticated, getAllProjects);             // Obtener todos los proyectos del usuario autenticado
router.get('/:slug', isAuthenticated, getProjectBySlug);      // Obtener un proyecto por su slug
router.post('/', isAuthenticated, createProject);             // Crear un nuevo proyecto
router.put('/:id', isAuthenticated, updateProject);           // Actualizar un proyecto existente
router.delete('/:id', isAuthenticated, deleteProject);        // Eliminar un proyecto

module.exports = router;
