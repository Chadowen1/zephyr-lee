import api from './api';

export const getTransporters = async () => {
  try {
    const response = await api.get('/api/transporteur');
    return response.data;
  } catch (error) {
    console.error('Error fetching transporters:', error);
    throw error;
  }
};