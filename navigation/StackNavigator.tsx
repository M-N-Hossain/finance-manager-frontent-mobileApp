import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entry } from '../utils/types';
import HomeScreen from '../screens/HomeScreen';
import CreateEntryScreen from '../screens/CreateEntryScreen';


export type RootStackParamList = {
  Home: undefined;
  CreateEntry: undefined;
  EditEntry: { entry: Entry };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateEntry" component={CreateEntryScreen} />
        {/* <Stack.Screen name="EditEntry" component={EditEntryScree} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
