// components/AppBar.jsx
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {

  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signin');
  };

  return (
    <View style={styles.container}>
      <Link to="/repositories" component={TouchableHighlight} underlayColor="#24292e">
        <Text style={styles.tab}>Repositories</Text>
      </Link>
      {data?.me ? (
        <Text style={styles.tab} onPress={signOut}>
          Sign out
        </Text>
      ) : (
        <Link to="/signin" component={TouchableHighlight} underlayColor="#24292e">
          <Text style={styles.tab}>Sign in</Text>
        </Link>
      )}
    </View>
  );
};

export default AppBar;
