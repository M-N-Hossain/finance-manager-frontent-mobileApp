import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, View } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
// import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Button title="View Entries" onPress={() => navigation.navigate('CreateEntry')} />
    </View>
  );
}
