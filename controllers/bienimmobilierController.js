const db = require('../models');

// Create a new BienImmobilier
exports.createBienImmobilier = async (req, res) => {
  try {
    const bienImmobilier = await db.BienImmobilier.create(req.body);
    res.status(201).json(bienImmobilier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all BienImmobiliers with pagination
exports.getAllBienImmobiliers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: bienImmobiliers } = await db.BienImmobilier.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalBienImmobiliers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      bienImmobiliers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single BienImmobilier by ID
exports.getBienImmobilierById = async (req, res) => {
  try {
    const bienImmobilier = await db.BienImmobilier.findByPk(req.params.id);
    if (bienImmobilier) {
      res.status(200).json(bienImmobilier);
    } else {
      res.status(404).json({ error: 'BienImmobilier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getbienImmobiliersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const bienImmobiliers = await db.BienImmobilier.findAll({
      where: { ProprietarieID: userId }
    });

    res.status(200).json(bienImmobiliers);
  } catch (error) {
    console.error('Error fetching properties by user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a BienImmobilier by ID
exports.updateBienImmobilier = async (req, res) => {
  try {
    const [updated] = await db.BienImmobilier.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBienImmobilier = await db.BienImmobilier.findByPk(req.params.id);
      res.status(200).json(updatedBienImmobilier);
    } else {
      res.status(404).json({ error: 'BienImmobilier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Partially update a BienImmobilier by ID (PATCH)
exports.patchBienImmobilier = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await db.BienImmobilier.update(updates, {
      where: { id },
    });

    if (updated) {
      const updatedBienImmobilier = await db.BienImmobilier.findByPk(id);
      res.status(200).json(updatedBienImmobilier);
    } else {
      res.status(404).json({ error: 'BienImmobilier not found' });
    }
  } catch (error) {
    console.error('Error partially updating BienImmobilier:', error);
    res.status(500).json({ error: 'Failed to partially update BienImmobilier' });
  }
};

// Delete a BienImmobilier by ID
exports.deleteBienImmobilier = async (req, res) => {
  try {
    const deleted = await db.BienImmobilier.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'BienImmobilier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};