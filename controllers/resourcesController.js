const db = require('../models');

// Create a new Resource entry
exports.createResource = async (req, res) => {
  try {
    const { title, description, category, link } = req.body;
    const resource = await db.Resources.create({
      title,
      description,
      category,
      link,
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await db.Resources.findAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single Resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await db.Resources.findByPk(req.params.id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a Resource by ID
exports.updateResource = async (req, res) => {
  try {
    const [updated] = await db.Resources.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedResource = await db.Resources.findByPk(req.params.id);
      res.status(200).json(updatedResource);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Partially update a Resource by ID (PATCH)
exports.patchResource = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const [updated] = await db.Resources.update(updates, {
        where: { id },
      });
  
      if (updated) {
        const updatedResource = await db.Resources.findByPk(id);
        res.status(200).json(updatedResource);
      } else {
        res.status(404).json({ error: 'Resource not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


// Delete a Resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const deleted = await db.Resources.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};