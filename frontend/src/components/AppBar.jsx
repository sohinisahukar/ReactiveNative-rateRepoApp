// components/AppBar.jsx
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import AppBarTab from './AppBarTab';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

const AppBar = () => {

  const { data } = useQuery(GET_CURRENT_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to="/repositories" component={TouchableHighlight} underlayColor="#24292e" style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.me ? (
          <>
            <Link to="/create-review" component={TouchableHighlight} underlayColor="#24292e" style={styles.tab}>
              <Text style={styles.text}>Create a review</Text>
            </Link>
            <Link to="/my-reviews" component={TouchableHighlight} underlayColor="#24292e" style={styles.tab}>
              <Text style={styles.text}>My reviews</Text>
            </Link>
            <TouchableHighlight onPress={signOut} underlayColor="#24292e" style={styles.tab}>
              <Text style={styles.text}>Sign out</Text>
            </TouchableHighlight>
          </>
        ) : (
          <>
            <Link to="/signin" component={TouchableHighlight} underlayColor="#24292e" style={styles.tab}>
              <Text style={styles.text}>Sign in</Text>
            </Link>
            <Link to="/signup" component={TouchableHighlight} underlayColor="#24292e" style={styles.tab}>
              <Text style={styles.text}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
