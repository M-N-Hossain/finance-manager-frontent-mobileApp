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
import CategoryItem from '../../components/CategoryItem';
import { CategoriesStackParamList } from '../../navigation/MainNavigator';
import { deleteCategory, fetchCategories } from '../../store/categoriesSlice';
import { RootState } from '../../store/store';
import { Category } from '../../utils/types';

type CategoriesScreenNavigationProp = StackNavigationProp<CategoriesStackParamList, 'Categories'>;

interface CategoriesScreenProps {
  navigation: CategoriesScreenNavigationProp;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadCategories();
    
    // Set header right button
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.navigate('CategoryCreate')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  const loadCategories = async () => {
    await dispatch(fetchCategories() as any);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCategories();
    setRefreshing(false);
  };
  
  const handleEditCategory = (category: Category) => {
    navigation.navigate('CategoryEdit', { categoryId: category.id });
  };
  
  const handleDeleteCategory = (category: Category) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await dispatch(deleteCategory(category.id) as any);
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
      {categories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-outline" size={60} color="#bdc3c7" />
          <Text style={styles.emptyText}>No categories yet</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => navigation.navigate('CategoryCreate')}
          >
            <Text style={styles.addButtonText}>Add Category</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onEdit={() => handleEditCategory(item)}
              onDelete={() => handleDeleteCategory(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          // onRefresh={handleRefresh}
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

export default CategoriesScreen;