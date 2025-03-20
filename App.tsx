import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigator from './navigation/MainNavigator';
import { store } from './store/store';


export default function App() {
  return (
    <Provider store={store}>
      {/* <StackNavigator /> */}
      {/* <AppNavigator /> */}
      <NavigationContainer>

      <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
