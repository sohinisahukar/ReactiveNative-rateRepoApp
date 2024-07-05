// Main.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppBar from './AppBar';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/repositories" element={<RepositoryList />} />
          <Route path="/repository/:id" element={<SingleRepository />} />
          <Route path="/create-review" element={<ReviewForm />} />
          <Route path="/my-reviews" element={<MyReviews />} />
        </Routes>
    </NativeRouter>
  );
};

export default Main;
