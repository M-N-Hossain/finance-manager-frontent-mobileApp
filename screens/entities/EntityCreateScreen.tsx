import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EntryForm from '../../components/EntryForm';
import { EntriesStackParamList } from '../../navigation/MainNavigator';
import { createEntry } from '../../store/entitiesSlice';
import { RootState } from '../../store/store';
import { EntryCreate } from '../../utils/types';

type EntryCreateScreenNavigationProp = StackNavigationProp<EntriesStackParamList, 'EntryCreate'>;

interface EntryCreateScreenProps {
  navigation: EntryCreateScreenNavigationProp;
}

const EntryCreateScreen: React.FC<EntryCreateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.entries);
  
  const handleSubmit = async (entryData: EntryCreate) => {
    await dispatch(createEntry(entryData) as any);
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <EntryForm categories={[]} onSubmit={handleSubmit} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default EntryCreateScreen;
