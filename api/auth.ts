import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem('authToken', token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/signup', { name, email, password });
    const { token } = response.data;
    await AsyncStorage.setItem('authToken', token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};