import api from './api';

export const getForeignHousing = async () => {
  try {
    const response = await api.get('/api/logementetranger');
    return response.data;
  } catch (error) {
    console.error('Error fetching foreign housing:', error);
    throw error;
  }
};

export const getForeignPropertiesByUserId = async (userId) => {
  try {
    const response = await api.get(`/api/logementetranger/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};