import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../../components/CategoryForm';
import { CategoriesStackParamList } from '../../navigation/MainNavigator';
import { fetchCategories, updateCategory } from '../../store/categoriesSlice';
import { RootState } from '../../store/store';
import { CategoryCreate } from '../../utils/types';

type CategoryEditScreenNavigationProp = StackNavigationProp<CategoriesStackParamList, 'CategoryEdit'>;
type CategoryEditScreenRouteProp = RouteProp<CategoriesStackParamList, 'CategoryEdit'>;

interface CategoryEditScreenProps {
  navigation: CategoryEditScreenNavigationProp;
  route: CategoryEditScreenRouteProp;
}

const CategoryEditScreen: React.FC<CategoryEditScreenProps> = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories);
  const [category, setCategory] = useState<any>(null);
  
  useEffect(() => {
    // If categories are not loaded yet, fetch them
    if (categories.length === 0) {
      dispatch(fetchCategories() as any);
    } else {
      // Find the category from the Redux store
      const foundCategory = categories.find(cat => cat.id === categoryId);
      if (foundCategory) {
        setCategory(foundCategory);
      }
    }
  }, [categoryId, categories, dispatch]);
  
  const handleSubmit = async (categoryData: CategoryCreate) => {
    await dispatch(updateCategory({ id: categoryId, category: categoryData }) as any);
    navigation.goBack();
  };
  
  if (!category && isLoading) {
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
  
  if (!category && !isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CategoryForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
        initialValues={category} 
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

export default CategoryEditScreen;