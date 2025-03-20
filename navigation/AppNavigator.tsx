import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        await AsyncStorage.getItem('authToken');
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkToken();
  }, []);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;