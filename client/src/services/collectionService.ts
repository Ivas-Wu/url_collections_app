import axios from 'axios';
import { Collection } from '../models/collections.models';

const API_URL = process.env.REACT_APP_API_URL;

export const createCollection = async (collectionName: string) : Promise<Collection> => {
    try {
    const response = await axios.post(`${API_URL}/api/collections/newCollection`, { collectionName });
    if (response.status !== 201 || !response.data.collectionUrl) {
        throw new Error('Failed to create new collection');
    }

    return response.data.collectionUrl;
    } catch (err) {
        throw err;
    }
};

export const getCollection = async (collectionUrl: string | undefined) : Promise<Collection> => {
    try {
        const response = await axios.get(`${API_URL}/api/collections/${collectionUrl}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch collections');
        }
        return response.data;
    } catch (err) {
      throw err;
    }
  };
  
