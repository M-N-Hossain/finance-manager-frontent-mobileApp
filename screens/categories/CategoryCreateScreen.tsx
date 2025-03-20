import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../../components/CategoryForm';
import { CategoriesStackParamList } from '../../navigation/MainNavigator';
import { createCategory } from '../../store/categoriesSlice';
import { RootState } from '../../store/store';
import { CategoryCreate } from '../../utils/types';

type CategoryCreateScreenNavigationProp = StackNavigationProp<CategoriesStackParamList, 'CategoryCreate'>;

interface CategoryCreateScreenProps {
  navigation: CategoryCreateScreenNavigationProp;
}

const CategoryCreateScreen: React.FC<CategoryCreateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.categories);
  
  const handleSubmit = async (categoryData: CategoryCreate) => {
    await dispatch(createCategory(categoryData) as any);
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <CategoryForm onSubmit={handleSubmit} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CategoryCreateScreen;