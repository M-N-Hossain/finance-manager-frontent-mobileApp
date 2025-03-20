import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EntryForm from '../../components/EntityForm';
import { EntitiesStackParamList } from '../../navigation/MainNavigator';
import { fetchEntries, updateEntity } from '../../store/entitiesSlice';
import { RootState } from '../../store/store';
import { EntityCreate } from '../../utils/types';

type EntityEditScreenNavigationProp = StackNavigationProp< EntitiesStackParamList, 'EntityEdit'>;
type EntityEditScreenRouteProp = RouteProp< EntitiesStackParamList, 'EntityEdit'>;

interface EntryEditScreenProps {
  navigation: EntityEditScreenNavigationProp;
  route: EntityEditScreenRouteProp;
}

const EntryEditScreen: React.FC<EntryEditScreenProps> = ({ navigation, route }) => {
  const { entityId } = route.params;
  const dispatch = useDispatch();
  const { entries, isLoading, error } = useSelector((state: RootState) => state.entries);
  const [entry, setEntry] = useState<any>(null);
  
  useEffect(() => {
    // If entries are not loaded yet, fetch them
    if (entries.length === 0) {
      dispatch(fetchEntries() as any);
    } else {
      // Find the entry from the Redux store
      const foundEntry = entries.find(e => e.id === entityId);
      if (foundEntry) {
        setEntry(foundEntry);
      }
    }
  }, [entityId, entries, dispatch]);
  
  const handleSubmit = async (entityData: EntityCreate) => {
    await dispatch(updateEntity({ id: entityId, entity: entityData }) as any);
    navigation.goBack();
  };
  
  if (!entry && isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  
  if (!entry && !isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Entry not found</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <EntryForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
        initialValues={entry} 
        categories={[]}
        // isEditing={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EntryEditScreen;