// controllers/projectController.js
const Project = require('../models/Project');
const Technology = require('../models/Technology');
const mongoose = require('mongoose');

// 📌 Obtener todos los proyectos del usuario autenticado
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).populate('technologies');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Obtener un proyecto por su slug
const getProjectBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const project = await Project.findOne({ slug, owner: req.user._id }).populate('technologies');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Crear un nuevo proyecto
const createProject = async (req, res) => {
  const { title, description, technologies, repositoryUrl, liveUrl, documentation } = req.body;

  try {
    // Generar slug único para el usuario
    const slug = title.toLowerCase().replace(/ /g, '-');

    const newProject = new Project({
      title,
      slug,
      description,
      technologies,
      repositoryUrl,
      liveUrl,
      documentation,
      owner: req.user._id,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Actualizar un proyecto
const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      updates,
      { new: true }
    );

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Eliminar un proyecto
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOneAndDelete({ _id: id, owner: req.user._id });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
