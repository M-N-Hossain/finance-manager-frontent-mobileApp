import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CategopryEntity } from './CategoriesEntity';
import { CategoriesAPI } from './CatgoriesAPI';

export default function CategoryList(): React.ReactElement {

  const [categories, setCategories] = useState<CategopryEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCategories() {
    try{
    const result = await CategoriesAPI.getCategories()
    setCategories(result)
    } catch (error) {
      console.error('Error while fetching categories:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    fetchCategories()
  }, [])

console.log(categories)
  return (
    <View style={{ flex: 1, backgroundColor: '#09b2ad'}}>
      <Text style={{backgroundColor: '#145553', color: 'white', width: 200, textAlign: 'center',}}>Categories:</Text>
      {categories.map((category) => (
        <Text style={{ color: 'white'}} key={category._id}>{category.category}</Text>
      ))}
    </View>
  );
}
