// src/components/ReviewItem.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
    marginBottom: 5,
  },
  reviewText: {
    marginTop: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const handleViewRepository = () => {
    if (review.repository && review.repository.id) {
      navigate(`/repository/${review.repository.id}`);
    } else {
      console.error('Repository ID is not available');
    }
  };

  const handleDeleteReview = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to delete this review?');
      if (confirmed) {
        performDeleteReview();
      }
    } else {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: performDeleteReview,
          },
        ],
        { cancelable: false }
      );
    }
  };

  const performDeleteReview = async () => {
    try {
      await deleteReview({ variables: { id: review.id } });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.content}>
        {review.repository && (
            <>
              <Text style={styles.fullName}>{review.repository.fullName}</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </>
          )}
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewRepository}>
          <Text style={styles.buttonText}>View repository</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteReview}>
          <Text style={styles.buttonText}>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewItem;
