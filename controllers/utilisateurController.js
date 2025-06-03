const db = require('../models');
const { validationResult } = require('express-validator');

// Create a new user
exports.createUtilisateur = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Nom, Email, MotDePasse, Role, Adress, Telephone } = req.body;

    // Check if the email already exists
    const existingUser = await db.Utilisateur.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create the user
    const utilisateur = await db.Utilisateur.create({
      Nom,
      Email,
      MotDePasse, // Password will be hashed automatically by the model hook
      Role,
      Adress,
      Telephone,
    });

    // Return the created user (excluding the password)
    const userResponse = { ...utilisateur.toJSON() };
    delete userResponse.MotDePasse;
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users with pagination
exports.getAllUtilisateurs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: utilisateurs } = await db.Utilisateur.findAndCountAll({
      attributes: { exclude: ['MotDePasse'] }, // Exclude password from the response
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      utilisateurs,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await db.Utilisateur.findByPk(req.params.id, {
      attributes: { exclude: ['MotDePasse'] }, // Exclude password from the response
    });

    if (!utilisateur) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(utilisateur);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update a user by ID
exports.updateUtilisateur = async (req, res) => {
  try {
    const { Nom, Email, Role, Adress, Telephone } = req.body;

    const [updated] = await db.Utilisateur.update(
      { Nom, Email, Role, Adress, Telephone },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedUtilisateur = await db.Utilisateur.findByPk(req.params.id, {
        attributes: { exclude: ['MotDePasse'] },
      });
      res.status(200).json(updatedUtilisateur);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Partially update a user by ID
exports.patchUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, currentPassword, newPassword } = req.body;

    const updates = {};
    if (name) updates.Nom = name;
    if (email) updates.Email = email;
    if (phone) updates.Telephone = phone;

    // Track if password updated
    let passwordUpdated = false;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, error: 'Current password is required to change password' });
      }

      const user = await db.Utilisateur.findByPk(id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      const isPasswordValid = await user.validPassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, error: 'Current password is incorrect' });
      }

      user.MotDePasse = newPassword;
      await user.save();
      passwordUpdated = true;
    }

    // Update other fields if any
    let updated = 0;
    if (Object.keys(updates).length > 0) {
      const [affectedRows] = await db.Utilisateur.update(updates, {
        where: { id },
      });
      updated = affectedRows;
    }

    // If either password was updated or other fields were updated, success
    if (passwordUpdated || updated) {
      const updatedUtilisateur = await db.Utilisateur.findByPk(id, {
        attributes: { exclude: ['MotDePasse'] },
      });
      return res.status(200).json({ success: true, utilisateur: updatedUtilisateur });
    } else {
      return res.status(404).json({ success: false, error: 'User not found or no changes applied' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

// Delete a user by ID
exports.deleteUtilisateur = async (req, res) => {
  try {
    const deleted = await db.Utilisateur.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// User login
exports.login = async (req, res) => {
  const { Email, MotDePasse } = req.body;

  try {
    // Find the user by email 
    const user = await db.Utilisateur.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password
    const isValidPassword = await user.validPassword(MotDePasse);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, Role: user.Role },
      process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Return the token and user details (excluding password)
    const userResponse = { ...user.toJSON() };
    delete userResponse.MotDePasse;
    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
