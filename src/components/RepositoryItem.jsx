// components/RepositoryItem.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
  language: {
    padding: 5,
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    borderRadius: 3,
    marginVertical: 5,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.stats}>
      <View style={styles.stat}>
        <Text>Stars</Text>
        <Text>{item.stargazersCount}</Text>
      </View>
      <View style={styles.stat}>
        <Text>Forks</Text>
        <Text>{item.forksCount}</Text>
      </View>
      <View style={styles.stat}>
        <Text>Reviews</Text>
        <Text>{item.reviewCount}</Text>
      </View>
      <View style={styles.stat}>
        <Text>Rating</Text>
        <Text>{item.ratingAverage}</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
