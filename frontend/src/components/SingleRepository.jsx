// src/components/SingleRepository.jsx
import React from 'react';
import { View, FlatList, StyleSheet, Button, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_REVIEW } from '../graphql/queries';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import { Linking } from 'expo';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY_REVIEW, {
    variables: { id, first: 5 },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first: 5,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          <Button
            title="Open in GitHub"
            onPress={() => Linking.openURL(repository.url)}
          />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
