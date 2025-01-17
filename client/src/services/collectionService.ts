import axios, { AxiosError } from 'axios';
import { Collection } from '../models/collections.models';
import { Url } from '../models/url.models';
import { generateHeader } from './authService';
import { handleErrorMessage } from '../utils/common';

const API_URL = process.env.REACT_APP_API_URL;

export const createCollection = async (collectionName: string) : Promise<Collection> => {
    try {
        const headers = await generateHeader();
        const response = await axios.post(`${API_URL}/api/collections/newCollection`, { collectionName }, {headers});
        return response.data.collectionUrl;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const getCollection = async (collectionUrl: string | undefined): Promise<Collection> => {
    try {
        const headers = await generateHeader();
        const response = await axios.get(`${API_URL}/api/collections/${collectionUrl}`, { headers });
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};


export const addCollection = async (collectionUrl: string, shortUrl: string | null, originalUrl: string | null, altName: string | null) : Promise<Url> => {
    const data = { collectionUrl, shortUrl, originalUrl, altName };
    try {
        const headers = await generateHeader();
        const response = await axios.patch(`${API_URL}/api/collections/add`, {data}, {headers});
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const removeUrlFromCollection = async (collectionUrl: string, shortUrl: string) => {
    const data = { collectionUrl, shortUrl };
    try {
        const headers = await generateHeader();
        const response = await axios.patch(`${API_URL}/api/collections/delete`, {data}, {headers});
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const findCollection = async (collectionUrl: string) => {
    try {
        const headers = await generateHeader();
        const response = await axios.get(`${API_URL}/api/collections/find/${collectionUrl}`, {headers});
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};
  
