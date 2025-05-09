// controllers/technologyController.js
const Technology = require('../models/Technology');

const getAllTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.status(200).json(technologies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTechnology = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newTechnology = new Technology({ name, description });
    await newTechnology.save();
    res.status(201).json(newTechnology);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTechnologies, createTechnology };
