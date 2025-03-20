import React, { useEffect } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { RootState } from '../store/store';
import { setEntries } from '../entries/entriesSlice';
import { Entry } from '../utils/types';

export default function EntriesScreen() {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries.entries);

  useEffect(() => {
    axios.get<Entry[]>('http://your-backend-api.com/entries')
      .then(response => dispatch(setEntries(response.data)))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <FlatList
        data={entries}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.amount}</Text>
            <Button title="Edit" onPress={() => console.log('Edit')} />
          </View>
        )}
      />
    </View>
  );
}
