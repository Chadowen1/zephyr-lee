const db = require('../models');

// Create a new UtilityUserID
exports.createUtilityUserID = async (req, res) => {
  try {
    const utilityUserID = await db.UtilityUserID.create(req.body);
    res.status(201).json(utilityUserID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all UtilityUserIDs with pagination
exports.getAllUtilityUserIDs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: utilityUserIDs } = await db.UtilityUserID.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalUtilityUserIDs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      utilityUserIDs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single UtilityUserID by ID
exports.getUtilityUserIDById = async (req, res) => {
  try {
    const utilityUserID = await db.UtilityUserID.findByPk(req.params.id);
    if (utilityUserID) {
      res.status(200).json(utilityUserID);
    } else {
      res.status(404).json({ error: 'UtilityUserID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a UtilityUserID by ID
exports.updateUtilityUserID = async (req, res) => {
  try {
    const [updated] = await db.UtilityUserID.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUtilityUserID = await db.UtilityUserID.findByPk(req.params.id);
      res.status(200).json(updatedUtilityUserID);
    } else {
      res.status(404).json({ error: 'UtilityUserID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a UtilityUserID by ID
exports.deleteUtilityUserID = async (req, res) => {
  try {
    const deleted = await db.UtilityUserID.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'UtilityUserID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};