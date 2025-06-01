import api from './api';

export const login = async (Email, MotDePasse) => {
  try {
    const response = await api.post('/api/auth/login', {
      Email,
      MotDePasse
    });

    if (response.status >= 200 && response.status < 300) {
      if (!response.data?.token) {
        throw new Error('Authentication failed: No token received');
      }

      return {
        token: response.data.token,
        user: response.data.user
      };
    } else {
      throw new Error(response.data?.error || 'Login failed');
    }
  } catch (error) {
    let errorMessage = 'Login failed. Please try again.';

    if (error.response) {
      errorMessage = error.response.data?.error ||
        error.response.data?.message ||
        errorMessage;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

export const signUp = async (userData) => {
  try {
    const response = await api.post('/api/utilisateur', {
      Nom: userData.Nom,
      Email: userData.Email,
      MotDePasse: userData.MotDePasse,
      Role: 'user',
      Adress: 'Not specified',
      Telephone: 'Not specified'
    });

    if (response.status !== 201) {
      throw new Error(response.data?.error || 'Registration failed');
    }

    return {
      user: response.data.user,
      token: response.data.token
    };

  } catch (error) {
    let errorMessage = 'Registration failed. Please try again.';

    if (error.response) {
      errorMessage = error.response.data?.error ||
        error.response.data?.message ||
        errorMessage;
    } else if (error.request) {
      errorMessage = 'Network error. Please check your connection.';
    }

    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const requestReset = async (email) => {
  try {
    const response = await api.post('/api/auth/request-reset', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'An error occurred while requesting a reset.';
    return { success: false, message: errorMessage };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/api/auth/reset-password', { token, newPassword });
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'An error occurred while requesting a reset.';
    return { success: false, message: errorMessage };
  }
};