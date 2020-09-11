import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);
  
  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const objFavorites = JSON.parse(response)
        setFavorites(objFavorites);
      }
    });
  };

  useFocusEffect(() => loadFavorites());

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys Favoritos" />

      <ScrollView
        style={styles.favoriteList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Favorites;