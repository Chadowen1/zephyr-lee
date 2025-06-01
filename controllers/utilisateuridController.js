const db = require('../models');

// Create a new UtilisateurID
exports.createUtilisateurID = async (req, res) => {
  try {
    const utilisateurID = await db.UtilisateurID.create(req.body);
    res.status(201).json(utilisateurID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all UtilisateurIDs with pagination
exports.getAllUtilisateurIDs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: utilisateurIDs } = await db.UtilisateurID.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalUtilisateurIDs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      utilisateurIDs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single UtilisateurID by ID
exports.getUtilisateurIDById = async (req, res) => {
  try {
    const utilisateurID = await db.UtilisateurID.findByPk(req.params.id);
    if (utilisateurID) {
      res.status(200).json(utilisateurID);
    } else {
      res.status(404).json({ error: 'UtilisateurID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a UtilisateurID by ID
exports.updateUtilisateurID = async (req, res) => {
  try {
    const [updated] = await db.UtilisateurID.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUtilisateurID = await db.UtilisateurID.findByPk(req.params.id);
      res.status(200).json(updatedUtilisateurID);
    } else {
      res.status(404).json({ error: 'UtilisateurID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a UtilisateurID by ID
exports.deleteUtilisateurID = async (req, res) => {
  try {
    const deleted = await db.UtilisateurID.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'UtilisateurID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};