import { Entry, EntryCreate } from '../utils/types';
import apiClient from './apiClient';

export const getEntries = async (): Promise<Entry[]> => {
  const response = await apiClient.get('/api/entries');
  return response.data;
};

export const getEntry = async (id: string): Promise<Entry> => {
  const response = await apiClient.get(`/api/entries/${id}`);
  return response.data;
};

export const createEntry = async (entry: EntryCreate): Promise<Entry> => {
  const response = await apiClient.post('/api/entries', entry);
  return response.data;
};

export const updateEntry = async (id: string, entry: EntryCreate): Promise<Entry> => {
  const response = await apiClient.put(`/api/entries/${id}`, entry);
  return response.data;
};

export const deleteEntry = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/entries/${id}`);
};