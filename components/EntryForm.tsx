// import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Category, EntryCreate } from '../utils/types';
import Button from './Button';

interface EntryFormProps {
  onSubmit: (entry: EntryCreate) => void;
  initialValues?: Partial<EntryCreate>;
  categories: Category[];
  isLoading?: boolean;
}

const EntryForm: React.FC<EntryFormProps> = ({
  onSubmit,
  initialValues = {},
  categories,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState(initialValues.amount?.toString() || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [categoryId, setCategoryId] = useState(initialValues.categoryId || (categories[0]?.id || ''));
  const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // If categories load after component mounts, set default categoryId
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        amount: parseFloat(amount),
        description,
        categoryId,
        date: date.toISOString(),
      });
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="decimal-pad"
      />
      {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
      
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoryId}
          onValueChange={(itemValue) => setCategoryId(itemValue)}
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
      </View>
      {errors.categoryId ? <Text style={styles.errorText}>{errors.categoryId}</Text> : null}
      
      <Text style={styles.label}>Date</Text>
      <Button 
        title={date.toLocaleDateString()} 
        onPress={() => setShowDatePicker(true)}
        type="secondary"
      />
      
      {/* {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
       */}
      <Button
        title="Save Entry"
        onPress={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      />
    </ScrollView>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 48,
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default EntryForm;