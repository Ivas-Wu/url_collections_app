import apiClient from './axiosClient';
import { Collection } from '../models/collections.models';
import { Url } from '../models/url.models';
import { generateHeader } from './authService';
import { handleErrorMessage } from '../utils/common';
import { AccessConstants } from '../constant/constants';

const API_URL = process.env.REACT_APP_API_URL;

export const getCollection = async (collectionUrl: string | undefined): Promise<Collection> => {
    try {
        const response = await apiClient.get(`${API_URL}/api/collections/${collectionUrl}`);
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const findCollection = async (collectionUrl: string) => {
    try {
        const headers = await generateHeader();
        const response = await apiClient.get(`${API_URL}/api/collections/find/${collectionUrl}`);
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const getUserCollections = async (): Promise<Collection[]> => {
    try {
        const response = await apiClient.get(`${API_URL}/api/collections/user`);
        return response.data.collections;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const createCollection = async (collectionName: string): Promise<Collection> => {
    try {
        const response = await apiClient.post(`${API_URL}/api/collections/new-collection`, { collectionName });
        return response.data.collectionUrl;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const addCollection = async (collectionUrl: string, shortUrl: string | null, originalUrl: string | null, altName: string | null): Promise<Url> => {
    const data = { collectionUrl, shortUrl, originalUrl, altName };
    try {
        const response = await apiClient.patch(`${API_URL}/api/collections/add`, { data });
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const removeUrlFromCollection = async (collectionUrl: string, shortUrl: string) => {
    const data = { collectionUrl, shortUrl };
    try {
        await apiClient.patch(`${API_URL}/api/collections/delete`, { data });
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

export const updateCollectionSettings = async (collectionUrl: string, collectionAccess: AccessConstants, collectionName: string, accessList: string[]) => {
    const data = { collectionUrl, collectionAccess, collectionName, accessList };
    try {
        const response = await apiClient.patch(`${API_URL}/api/collections/update`, { data });
        return response.data;
    } catch (err) {
        throw Error(handleErrorMessage(err));
    }
};

