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


export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    const data = response.data;
    localStorage.setItem('accessToken', data.accessToken);

    return data;
  } catch (err) {
    throw Error(handleErrorMessage(err));
  }
};

export const generateHeader = async () => {
  const token = localStorage.getItem('accessToken'); 

  const headers: any = {};
  if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}
