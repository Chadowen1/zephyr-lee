import api from './api';

export const getProperties = async () => {
  try {
    const response = await api.get('/api/bienimmobilier');
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await api.get(`/api/bienimmobilier/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

export const getPropertiesByUserId = async (userId) => {
  try {
    const response = await api.get(`/api/bienimmobilier/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

export const deletePropertieById = async (id) => {
  try {
    const response = await api.delete(`/api/bienimmobilier/${id}`);

    if (response.status === 204) {
      return { success: true };
    }

    return { success: false, data: response.data };
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

export const addProperty = async (propertyData) => {
  const response = await api.post('/api/bienimmobilier', propertyData);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/api/bienimmobilier/${id}`, propertyData);
  return response.data;
};