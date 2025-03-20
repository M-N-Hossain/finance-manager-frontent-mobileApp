// import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Category, EntityCreate } from '../utils/types';
import Button from './Button';

interface EntityFormProps {
  onSubmit: (entity: EntityCreate) => void;
  initialValues?: Partial<EntityCreate>;
  categories: Category[];
  isLoading?: boolean;
}

const EntityForm: React.FC<EntityFormProps> = ({
  onSubmit,
  initialValues = {},
  categories,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState(initialValues.amount?.toString() || '');
  const [title, setTitle] = useState(initialValues.title || '');
  const [category, setCategory] = useState(initialValues.category || '');
  // const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // If categories load after component mounts, set default category
    if (categories.length > 0 && !category) {
      setCategory(categories[0].title);
    }
  }, [categories]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!title.trim()) {
      newErrors.title = 'title is required';
    }
    
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        amount: parseFloat(amount),
        title,
        category,
        // date: date.toISOString(),
      });
    }
  };

  // const handleDateChange = (event: any, selectedDate?: Date) => {
  //   setShowDatePicker(false);
  //   if (selectedDate) {
  //     setDate(selectedDate);
  //   }
  // };

  console.log(category)
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
      
      <Text style={styles.label}>title</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        multiline
      />
      {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
      
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.title} value={category.title} />
          ))}
        </Picker>
      </View>
      {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}
      
      {/* <Text style={styles.label}>Date</Text> */}
      {/* <Button 
        title={date.toLocaleDateString()} 
        onPress={() => setShowDatePicker(true)}
        type="secondary"
      /> */}
      
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
    height: 50,
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
    height: 50,
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default EntityForm;