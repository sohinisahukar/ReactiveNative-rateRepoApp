// src/components/MyReviews.jsx
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { GET_CURRENT_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];

  const renderItem = ({ item }) => (
    <ReviewItem review={item} refetch={refetch} />
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
