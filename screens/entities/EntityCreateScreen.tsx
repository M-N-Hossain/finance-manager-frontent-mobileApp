import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EntityForm from '../../components/EntityForm';
import { EntitiesStackParamList } from '../../navigation/MainNavigator';
import { createEntity } from '../../store/entitiesSlice';
import { RootState } from '../../store/store';
import { EntityCreate } from '../../utils/types';

type EntryCreateScreenNavigationProp = StackNavigationProp<EntitiesStackParamList, 'EntityCreate'>;

interface EntryCreateScreenProps {
  navigation: EntryCreateScreenNavigationProp;
}

const EntryCreateScreen: React.FC<EntryCreateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.entries);
  const { categories } = useSelector((state: RootState) => state.categories);


  useEffect( ()=> {
     fetchCategories()
  }, [])

  const fetchCategories = async () => {
    await dispatch(fetchCategories() as any);
  }

  const handleSubmit = async (entryData: EntityCreate) => {
    await dispatch(createEntity(entryData) as any);
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <EntityForm categories={categories} onSubmit={handleSubmit} isLoading={isLoading} />
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
