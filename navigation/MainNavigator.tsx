import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CategoriesScreen from '../screens/categories/CategoriesScreen';
import CategoryCreateScreen from '../screens/categories/CategoryCreateScreen';
import CategoryEditScreen from '../screens/categories/CategoryEditScreen';
import EntriesScreen from '../screens/entries/EntitiesScreen';
import EntryCreateScreen from '../screens/entries/EntityCreateScreen';
import EntryEditScreen from '../screens/entries/EntityEditScreen';

export type EntriesStackParamList = {
  Entries: undefined;
  EntryCreate: undefined;
  EntryEdit: { entryId: string };
};

export type CategoriesStackParamList = {
  Categories: undefined;
  CategoryCreate: undefined;
  CategoryEdit: { categoryId: string };
};

export type MainTabParamList = {
  EntriesTab: undefined;
  CategoriesTab: undefined;
};

const EntriesStack = createStackNavigator<EntriesStackParamList>();
const CategoriesStack = createStackNavigator<CategoriesStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const EntriesNavigator = () => {
  return (
    <EntriesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <EntriesStack.Screen name="Entries" component={EntriesScreen} />
      <EntriesStack.Screen name="EntryCreate" component={EntryCreateScreen} options={{ title: 'Add Entry' }} />
      <EntriesStack.Screen name="EntryEdit" component={EntryEditScreen} options={{ title: 'Edit Entry' }} />
    </EntriesStack.Navigator>
  );
};

const CategoriesNavigator = () => {
  return (
    <CategoriesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <CategoriesStack.Screen name="Categories" component={CategoriesScreen} />
      <CategoriesStack.Screen name="CategoryCreate" component={CategoryCreateScreen} options={{ title: 'Add Category' }} />
      <CategoriesStack.Screen name="CategoryEdit" component={CategoryEditScreen} options={{ title: 'Edit Category' }} />
    </CategoriesStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'EntriesTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'CategoriesTab') {
            iconName = focused ? 'folder' : 'folder-outline';
          }
          
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <MainTab.Screen 
        name="EntriesTab" 
        component={EntriesNavigator} 
        options={{ title: 'Entries' }}
      />
      <MainTab.Screen 
        name="CategoriesTab" 
        component={CategoriesNavigator} 
        options={{ title: 'Categories' }}
      />
    </MainTab.Navigator>
  );
};

export default MainNavigator;