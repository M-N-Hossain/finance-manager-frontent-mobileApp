import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CategoryCreate } from '../utils/types';
import Button from './Button';

interface CategoryFormProps {
  onSubmit: (category: CategoryCreate) => void;
  initialValues?: CategoryCreate;
  isLoading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  onSubmit, 
  initialValues = { title: '', description: '' }, 
  isLoading = false 
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [error, setError] = useState('');
  
  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Category title is required');
      return;
    }
    if (!description.trim()) {
      setError('Category description is required');
      return;
    }
    
    setError('');
    onSubmit({ title, description});
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter category title"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter category description"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Button
        title="Save Category"
        onPress={handleSubmit}
        isLoading={false}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 16,
  },
});

export default CategoryForm;