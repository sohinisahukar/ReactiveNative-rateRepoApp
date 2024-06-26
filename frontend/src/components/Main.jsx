// Main.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <NativeRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/repositories" element={<RepositoryList />} />
        </Routes>
    </NativeRouter>
  );
};

export default Main;
