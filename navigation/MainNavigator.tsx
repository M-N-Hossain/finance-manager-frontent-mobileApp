import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CategoriesScreen from '../screens/categories/CategoriesScreen';
import CategoryCreateScreen from '../screens/categories/CategoryCreateScreen';
import CategoryEditScreen from '../screens/categories/CategoryEditScreen';
import EntriesScreen from '../screens/entities/EntitiesScreen';
import EntryCreateScreen from '../screens/entities/EntityCreateScreen';
import EntryEditScreen from '../screens/entities/EntityEditScreen';

export type EntitiesStackParamList = {
  Entities: undefined;
  EntityCreate: undefined;
  EntityEdit: { entityId: string };
};

export type CategoriesStackParamList = {
  Categories: undefined;
  CategoryCreate: undefined;
  CategoryEdit: { categoryId: string };
};

export type MainTabParamList = {
  EntitiesTab: undefined;
  CategoriesTab: undefined;
};

const EntriesStack = createStackNavigator<EntitiesStackParamList>();
const CategoriesStack = createStackNavigator<CategoriesStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const EntitiesNavigator = () => {
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
      <EntriesStack.Screen name="Entities" component={EntriesScreen} />
      <EntriesStack.Screen name="EntityCreate" component={EntryCreateScreen} options={{ title: 'Add Entry' }} />
      <EntriesStack.Screen name="EntityEdit" component={EntryEditScreen} options={{ title: 'Edit Entry' }} />
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
          
          if (route.name === 'EntitiesTab') {
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
        name="EntitiesTab" 
        component={EntitiesNavigator} 
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