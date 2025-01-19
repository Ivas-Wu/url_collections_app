import axios from 'axios';
import { generateHeader } from './authService';

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    const headers = await generateHeader();
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = refreshResponse.data;

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;

        return apiClient(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
