// components/RepositoryItem.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';

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
  button: {
    marginTop: 10,
  },
});

const RepositoryItem = ({ item, showGitHubButton }) => (
  <View style={styles.container} testID="repositoryItem">
    <View style={{ flexDirection: 'row' }}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.fullName} testID="fullName">{item.fullName}</Text>
        <Text style={styles.description} testID="description">{item.description}</Text>
        <Text style={styles.language} testID="language">{item.language}</Text>
      </View>
    </View>
    <View style={styles.stats}>
      <View style={styles.stat} testID="stargazersCount">
        <Text>Stars</Text>
        <Text>{item.stargazersCount}</Text>
      </View>
      <View style={styles.stat} testID="forksCount">
        <Text>Forks</Text>
        <Text>{item.forksCount}</Text>
      </View>
      <View style={styles.stat} testID="reviewCount">
        <Text>Reviews</Text>
        <Text>{item.reviewCount}</Text>
      </View>
      <View style={styles.stat} testID="ratingAverage">
        <Text>Rating</Text>
        <Text>{item.ratingAverage}</Text>
      </View>
    </View>
    {showGitHubButton && (
      <View style={styles.button}>
        <Button title="Open in GitHub" onPress={() => Linking.openURL(item.url)} />
      </View>
    )}
  </View>
);

export default RepositoryItem;
