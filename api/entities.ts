import { Entity, EntityCreate } from '../utils/types';
import apiClient from './apiClient';

export const getEntities = async (): Promise<Entity[]> => {
  const response = await apiClient.get('/api/entities');
  return response.data;
};

export const getEntity = async (id: string): Promise<Entity> => {
  const response = await apiClient.get(`/api/entities/${id}`);
  return response.data;
};

export const createEntity = async (entity: EntityCreate): Promise<Entity> => {
  const response = await apiClient.post('/api/entities', entity);
  return response.data;
};

export const updateEntity = async (id: string, entity: EntityCreate): Promise<Entity> => {
  const response = await apiClient.put(`/api/entities/${id}`, entity);
  return response.data;
};

export const deleteEntity = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/entities/${id}`);
};