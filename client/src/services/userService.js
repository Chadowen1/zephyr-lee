import api from './api';

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await api.post('/api/utilisateur', userData); // Updated from /utilisateur
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Get all users
export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/api/utilisateur', { // Updated from /utilisateur
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get a single user by ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/api/utilisateur/${id}`); // Updated from /utilisateur
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, userData) => {
  try {
    const updates = userData;
    const response = await api.patch(`/api/utilisateur/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating user via PATCH:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/utilisateur/${id}`); // Updated from /utilisateur
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};