import axios from 'axios';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEntry } from '../entries/entriesSlice';
import { Entry } from '../utils/types';

export default function CreateEntryScreen() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newEntry: Entry = { id: Date.now(), name, amount: parseFloat(amount) };
    axios.post('http://your-backend-api.com/entries', newEntry)
      .then(response => {
        dispatch(addEntry(response.data));
      })
      .catch(error => console.error(error));
  };

  return (
    <View>
      <TextInput placeholder="Entry Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Button title="Save Entry" onPress={handleSubmit} />
    </View>
  );
}
