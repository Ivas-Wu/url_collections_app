import { handleErrorMessage } from '../utils/common';
import apiClient from './axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/api/auth/register`, {
      email,
      password,
      username
    });

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }

    return response.data;
  } catch (err) {
    throw Error(handleErrorMessage(err));
  }
};


export const userLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    const data = response.data;
    storeToken(data.accessToken);
    window.location.href = '/';
    return data;
  } catch (err) {
    throw Error(handleErrorMessage(err));
  }
};

export const userLogout = () => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('user');//for future not used rn
  window.location.href = '/';
};

export const generateHeader = async () => {
  const headers: any = {};
  
  const defaultAuth = apiClient.defaults.headers.common['Authorization'];
  
  if (defaultAuth) {
    headers['Authorization'] = defaultAuth;
  } else {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

export const storeToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
