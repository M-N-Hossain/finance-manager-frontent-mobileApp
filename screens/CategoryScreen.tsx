import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { CategoriesAPI } from '../categories/CategoriesAPI';
import { CategopryEntity } from '../categories/CategoryEntity';
import CategoryList from '../categories/CategoryList';

export default function CategoryScreen() {

    const [title, setTitle] = React.useState<string>('');

    async function onHandlePress() {
        const createdCategory = await CategoriesAPI.createCategory(new CategopryEntity(title))
        console.log(createdCategory)
    }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 200, width: '100%', backgroundColor: '#09b2ad' }}>
        <TextInput value={title} onChangeText={setTitle} placeholder='Search' style={{ width: 200, height: 40, borderWidth: 1 }} />
        <Pressable onPress={onHandlePress} style={{ margin: 10, width: 50, alignItems: 'center', justifyContent: 'center', height: 40, borderWidth: 1}}><Text>ADD</Text></Pressable>
        <CategoryList />
    </View>
  )
}
