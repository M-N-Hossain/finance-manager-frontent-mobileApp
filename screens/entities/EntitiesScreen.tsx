import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import EntityItem from '../../components/EntryItem';
import { EntitiesStackParamList } from '../../navigation/MainNavigator';
import { deleteEntity, fetchEntities } from '../../store/entitiesSlice';
import { RootState } from '../../store/store';
import { Entity } from '../../utils/types';

type EntitiesScreenNavigationProp = StackNavigationProp<EntitiesStackParamList, 'Entities'>;

interface EntitiesScreenProps {
  navigation: EntitiesScreenNavigationProp;
}

const EntitiesScreen: React.FC<EntitiesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { entities, isLoading, error } = useSelector((state: RootState) => state.entries);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadEntries();
    
    // Set header right button
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.navigate('EntityCreate')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  const loadEntries = async () => {
    await dispatch(fetchEntities() as any);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadEntries();
    setRefreshing(false);
  };
  
  const handleEditEntry = (entity: Entity) => {
    navigation.navigate('EntityEdit', { entityId: entity.id });
  };
  
  const handleDeleteEntry = (entity: Entity) => {
    Alert.alert(
      'Delete Entity',
      `Are you sure you want to delete this entity?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await dispatch(deleteEntity(entity.id) as any);
          }
        },
      ]
    );
  };
  
  if (isLoading && !refreshing) {
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
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {entities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="#bdc3c7" />
          <Text style={styles.emptyText}>No entries yet</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => navigation.navigate('EntityCreate')}
          >
            <Text style={styles.addButtonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={entities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntityItem
              entity={item}
              onEdit={() => handleEditEntry(item)}
              onDelete={() => handleDeleteEntry(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    marginRight: 16,
  },
  listContainer: {
    padding: 16,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 16,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EntitiesScreen;