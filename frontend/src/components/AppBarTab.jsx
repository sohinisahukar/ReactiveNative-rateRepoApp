// components/AppBarTab.jsx
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tab: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <Pressable>
      <Text style={styles.tab}>{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;
