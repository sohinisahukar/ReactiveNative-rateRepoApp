// src/components/ReviewItem.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    marginBottom: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
