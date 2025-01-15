import axios from 'axios';
import { Url } from '../models/url.models'

const API_URL = process.env.REACT_APP_API_URL;

export const shortenUrl = async (originalUrl: string, altName: string | null): Promise<Url> => {
  try {
    const response = await axios.post(`${API_URL}/api/shorten`, { originalUrl, altName });
    if (response.status !== 201 || !response.data.newUrl) {
      throw new Error('Failed to shorten Url');
    }
    return response.data.newUrl;
    } catch (err) {
        throw err;
    }
};

export const redirectPage = async (shortUrl: string | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/api/${shortUrl}`);
    if (response.status !== 200 || !response.data) {
      throw new Error('Failed to redirect');
    }
    return response.data;
  } catch (err) {
      throw err;
  }
};
