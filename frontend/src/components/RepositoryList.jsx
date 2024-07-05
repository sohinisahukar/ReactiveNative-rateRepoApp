import React, { useState} from 'react';
import { FlatList, View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  separator: {
    height: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ orderBy, setOrderBy, orderDirection, setOrderDirection, searchKeyword, setSearchKeyword }) => (
  <View>
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
    <Picker
      selectedValue={`${orderBy}-${orderDirection}`}
      style={styles.picker}
      onValueChange={(itemValue) => {
        const [order, direction] = itemValue.split('-');
        setOrderBy(order);
        setOrderDirection(direction);
      }}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT-DESC" />
      <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE-DESC" />
      <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE-ASC" />
    </Picker>
  </View>
);

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, loading, error } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);
  const navigate = useNavigate();

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryListHeader
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
      }
    />
  );
};

export default RepositoryList;