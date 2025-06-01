const db = require('../models');

// Create a new LogementEtranger
exports.createLogementEtranger = async (req, res) => {
  try {
    const logementEtranger = await db.LogementEtranger.create(req.body);
    res.status(201).json(logementEtranger);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all LogementEtrangers with pagination
exports.getAllLogementEtrangers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: logementEtrangers } = await db.LogementEtranger.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalLogementEtrangers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      logementEtrangers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single LogementEtranger by ID
exports.getLogementEtrangerById = async (req, res) => {
  try {
    const logementEtranger = await db.LogementEtranger.findByPk(req.params.id);
    if (logementEtranger) {
      res.status(200).json(logementEtranger);
    } else {
      res.status(404).json({ error: 'LogementEtranger not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a LogementEtranger by ID
exports.updateLogementEtranger = async (req, res) => {
  try {
    const [updated] = await db.LogementEtranger.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLogementEtranger = await db.LogementEtranger.findByPk(req.params.id);
      res.status(200).json(updatedLogementEtranger);
    } else {
      res.status(404).json({ error: 'LogementEtranger not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogementEtrangersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const logementEtrangers = await db.LogementEtranger.findAll({
      where: { ProprietaireID: userId }
    });

    res.status(200).json(logementEtrangers);
  } catch (error) {
    console.error('Error fetching properties by user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Partially update a LogementEtranger by ID (PATCH)
exports.patchLogementEtranger = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await db.LogementEtranger.update(updates, {
      where: { id },
    });

    if (updated) {
      const updatedLogementEtranger = await db.LogementEtranger.findByPk(id);
      res.status(200).json(updatedLogementEtranger);
    } else {
      res.status(404).json({ error: 'LogementEtranger not found' });
    }
  } catch (error) {
    console.error('Error partially updating LogementEtranger:', error);
    res.status(500).json({ error: 'Failed to partially update LogementEtranger' });
  }
};

// Delete a LogementEtranger by ID
exports.deleteLogementEtranger = async (req, res) => {
  try {
    const deleted = await db.LogementEtranger.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'LogementEtranger not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};