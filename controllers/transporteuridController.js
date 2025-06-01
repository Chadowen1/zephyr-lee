const db = require('../models');

// Create a new TransporteurID
exports.createTransporteurID = async (req, res) => {
  try {
    const transporteurID = await db.TransporteurID.create(req.body);
    res.status(201).json(transporteurID);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all TransporteurIDs with pagination
exports.getAllTransporteurIDs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: transporteurIDs } = await db.TransporteurID.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalTransporteurIDs: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      transporteurIDs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single TransporteurID by ID
exports.getTransporteurIDById = async (req, res) => {
  try {
    const transporteurID = await db.TransporteurID.findByPk(req.params.id);
    if (transporteurID) {
      res.status(200).json(transporteurID);
    } else {
      res.status(404).json({ error: 'TransporteurID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a TransporteurID by ID
exports.updateTransporteurID = async (req, res) => {
  try {
    const [updated] = await db.TransporteurID.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedTransporteurID = await db.TransporteurID.findByPk(req.params.id);
      res.status(200).json(updatedTransporteurID);
    } else {
      res.status(404).json({ error: 'TransporteurID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a TransporteurID by ID
exports.deleteTransporteurID = async (req, res) => {
  try {
    const deleted = await db.TransporteurID.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'TransporteurID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};