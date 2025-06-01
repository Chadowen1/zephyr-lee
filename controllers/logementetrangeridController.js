const db = require('../models');

// Create a new LogementEtrangerID
exports.createLogementEtrangerID = async (req, res) => {
  try {
    const logementEtrangerID = await db.LogementEtrangerID.create(req.body);
    res.status(201).json(logementEtrangerID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all LogementEtrangerIDs with pagination
exports.getAllLogementEtrangerIDs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: logementEtrangerIDs } = await db.LogementEtrangerID.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalLogementEtrangerIDs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      logementEtrangerIDs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single LogementEtrangerID by ID
exports.getLogementEtrangerIDById = async (req, res) => {
  try {
    const logementEtrangerID = await db.LogementEtrangerID.findByPk(req.params.id);
    if (logementEtrangerID) {
      res.status(200).json(logementEtrangerID);
    } else {
      res.status(404).json({ error: 'LogementEtrangerID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a LogementEtrangerID by ID
exports.updateLogementEtrangerID = async (req, res) => {
  try {
    const [updated] = await db.LogementEtrangerID.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedLogementEtrangerID = await db.LogementEtrangerID.findByPk(req.params.id);
      res.status(200).json(updatedLogementEtrangerID);
    } else {
      res.status(404).json({ error: 'LogementEtrangerID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a LogementEtrangerID by ID
exports.deleteLogementEtrangerID = async (req, res) => {
  try {
    const deleted = await db.LogementEtrangerID.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'LogementEtrangerID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};