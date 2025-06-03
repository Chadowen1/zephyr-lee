const db = require('../models');

// Create a new RelocationAssistance entry (POST)
exports.createRelocationAssistance = async (req, res) => {
  try {
    const { services_offered, email } = req.body;

    const user = await db.Utilisateur.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const relocation = await db.RelocationAssistance.create({
      services_offered,
      user_id: user.id,
      contact_info: email,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(relocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all RelocationAssistance entries
exports.getAllRelocationAssistance = async (req, res) => {
  try {
    const relocationAssistances = await db.RelocationAssistance.findAll();
    res.status(200).json(relocationAssistances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single RelocationAssistance entry by ID
exports.getRelocationAssistanceById = async (req, res) => {
  try {
    const relocationAssistance = await db.RelocationAssistance.findByPk(req.params.id);
    if (relocationAssistance) {
      res.status(200).json(relocationAssistance);
    } else {
      res.status(404).json({ error: 'RelocationAssistance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a RelocationAssistance entry by ID (PUT)
exports.updateRelocationAssistance = async (req, res) => {
  try {
    const [updated] = await db.RelocationAssistance.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRelocationAssistance = await db.RelocationAssistance.findByPk(req.params.id);
      res.status(200).json(updatedRelocationAssistance);
    } else {
      res.status(404).json({ error: 'RelocationAssistance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Partially update a RelocationAssistance entry by ID (PATCH)
exports.patchRelocationAssistance = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await db.RelocationAssistance.update(updates, {
      where: { id },
    });

    if (updated) {
      const updatedRelocationAssistance = await db.RelocationAssistance.findByPk(id);
      res.status(200).json(updatedRelocationAssistance);
    } else {
      res.status(404).json({ error: 'RelocationAssistance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a RelocationAssistance entry by ID (DELETE)
exports.deleteRelocationAssistance = async (req, res) => {
  try {
    const deleted = await db.RelocationAssistance.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'RelocationAssistance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};