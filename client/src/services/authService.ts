import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (email: string, password: string, username: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      email,
      password,
      username
    });

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }

    return response.data; 
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        
        if (Array.isArray(errors)) {
            throw new Error(errors.map((error) => error.msg).join(', '));
        } else {
            throw new Error(errors); 
        }
      } else {
            throw new Error(err.message || 'An unknown error occurred'); 
      }
    } else {
        throw new Error('An unknown error occurred');
    }
  }
};


export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    const data = response.data;
    localStorage.setItem('token', data.token);

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
        if (err.response && err.response.data && err.response.data.error) {
            throw Error(err.response.data.error); 
        } else {
            throw Error(err.message || 'An unknown error occurred'); 
        }
    } else {
        throw Error('An unknown error occurred');
    }
  }
};

export const generateHeader = async () => {
  const token = localStorage.getItem('token'); 

  const headers: any = {};
  if (token) {
      headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}
