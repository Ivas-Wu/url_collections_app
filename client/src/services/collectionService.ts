import axios from 'axios';
import { Collection } from '../models/collections.models';
import { Url } from '../models/url.models';

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

export const addCollection = async (collectionUrl: string, shortUrl: string | null, originalUrl: string | null, altName: string | null) : Promise<Url> => {
    const data = { collectionUrl, shortUrl, originalUrl, altName };
    try {
        const response = await axios.patch(`${API_URL}/api/collections/add`, {data});
        if (response.status === 204) {
            //already in colection do nothing 
        }
        else if (response.status !== 200) {
            throw new Error('Failed to add url to collection');
        }
        return response.data;
    } catch (err) {
      throw err;
    }
};

export const removeUrlFromCollection = async (collectionUrl: string, shortUrl: string) => {
    const data = { collectionUrl, shortUrl };
    try {
        const response = await axios.patch(`${API_URL}/api/collections/delete`, {data});
        if (response.status === 204) {
            //already removed from collection, sync issue
        }
        else if (response.status !== 200) {
            throw new Error('Failed to add url to collection');
        }
    } catch (err) {
      throw err;
    }
};
  
