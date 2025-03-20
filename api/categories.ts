import axios from 'axios';
import { Category, CategoryCreate } from '../utils/types';
import apiClient from './apiClient';

export const getCategories = async (): Promise<Category[]> => {

  // try {
  //   const response = await fetch('http://192.168.0.101:3000/api/categories');

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch categories');
  //   }
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error while fetching categories:', error);
  //   throw error;
  // }

  const response = await apiClient.get('/api/categories');
  console.log(response)
  return response.data;
};

export const getCategory = async (id: string): Promise<Category> => {
  const response = await apiClient.get(`/api/categories/${id}`);
  return response.data;
};

export const createCategory = async (category: CategoryCreate): Promise<Category> => {
  const response = await axios.post('http://192.168.0.101:3000/api/categories', category);
  return response.data;
};

export const updateCategory = async (id: string, category: CategoryCreate): Promise<Category> => {
  const response = await apiClient.put(`/api/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/categories/${id}`);
};
