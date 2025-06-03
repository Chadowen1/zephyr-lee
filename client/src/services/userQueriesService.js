import api from './api';

export const createUserQuery = async (formData) => {
    try {
        const response = await api.post('/api/userqueries/', formData,);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data?.error || 'Server returned an error');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};