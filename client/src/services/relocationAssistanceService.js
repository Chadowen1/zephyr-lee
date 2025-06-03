import api from './api';

export const createRelocationAssistance = async (services_offered, email) => {
    try {
        const response = await api.post('/api/relocationassistance/', {
            services_offered,
            email,
        });
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
