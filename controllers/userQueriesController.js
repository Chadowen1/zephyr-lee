const db = require('../models');

// Create a new UserQuery entry
exports.createUserQuery = async (req, res) => {
  try {
    const { fullName, email, phone, message, moveInDate, financing } = req.body;

    console.log("Looking up user with email:", email);

    // Ensure correct model name
    const user = await db.Utilisateur.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email.' });
    }

    const userQuery = await db.UserQueries.create({
      category: 'general',
      question: message,
      user_id: user.id,
      status: 'pending',
    });

    res.status(201).json(userQuery);
  } catch (error) {
    console.error('Error in createUserQuery:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all UserQueries
exports.getAllUserQueries = async (req, res) => {
  try {
    const userQueries = await db.UserQueries.findAll();
    res.status(200).json(userQueries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single UserQuery by ID
exports.getUserQueryById = async (req, res) => {
  try {
    const userQuery = await db.UserQueries.findByPk(req.params.id);
    if (userQuery) {
      res.status(200).json(userQuery);
    } else {
      res.status(404).json({ error: 'UserQuery not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a UserQuery by ID
exports.updateUserQuery = async (req, res) => {
  try {
    const [updated] = await db.UserQueries.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUserQuery = await db.UserQueries.findByPk(req.params.id);
      res.status(200).json(updatedUserQuery);
    } else {
      res.status(404).json({ error: 'UserQuery not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Partially update a UserQuery by ID (PATCH)
exports.patchUserQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await db.UserQueries.update(updates, {
      where: { id },
    });

    if (updated) {
      const updatedUserQuery = await db.UserQueries.findByPk(id);
      res.status(200).json(updatedUserQuery);
    } else {
      res.status(404).json({ error: 'UserQuery not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a UserQuery by ID
exports.deleteUserQuery = async (req, res) => {
  try {
    const deleted = await db.UserQueries.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'UserQuery not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};