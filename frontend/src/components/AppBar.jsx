// components/AppBar.jsx
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import AppBarTab from './AppBarTab';

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
  return (
      <View style={styles.container}>
          <ScrollView horizontal style={styles.scrollView}>
              <Link to="/" component={AppBarTab}>
                  <Text>Repositories</Text>
              </Link>
              <Link to="/signin" component={AppBarTab}>
                  <Text>Sign in</Text>
              </Link>
              {/* Add more AppBarTab components here for additional tabs */}
          </ScrollView>
      </View>
  );
};

export default AppBar;
