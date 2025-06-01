const db = require('../models');

// Create a new Transporteur
exports.createTransporteur = async (req, res) => {
  try {
    const transporteur = await db.Transporteur.create(req.body);
    res.status(201).json(transporteur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Transporteurs with pagination
exports.getAllTransporteurs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: transporteurs } = await db.Transporteur.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalTransporteurs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      transporteurs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Transporteur by ID
exports.getTransporteurById = async (req, res) => {
  try {
    const transporteur = await db.Transporteur.findByPk(req.params.id);
    if (transporteur) {
      res.status(200).json(transporteur);
    } else {
      res.status(404).json({ error: 'Transporteur not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Transporteur by ID
exports.updateTransporteur = async (req, res) => {
  try {
    const [updated] = await db.Transporteur.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTransporteur = await db.Transporteur.findByPk(req.params.id);
      res.status(200).json(updatedTransporteur);
    } else {
      res.status(404).json({ error: 'Transporteur not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Partially update a Transporteur by ID (PATCH)
exports.patchTransporteur = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await db.Transporteur.update(updates, {
      where: { id },
    });

    if (updated) {
      const updatedTransporteur = await db.Transporteur.findByPk(id);
      res.status(200).json(updatedTransporteur);
    } else {
      res.status(404).json({ error: 'Transporteur not found' });
    }
  } catch (error) {
    console.error('Error partially updating Transporteur:', error);
    res.status(500).json({ error: 'Failed to partially update Transporteur' });
  }
};

// Delete a Transporteur by ID
exports.deleteTransporteur = async (req, res) => {
  try {
    const deleted = await db.Transporteur.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Transporteur not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};