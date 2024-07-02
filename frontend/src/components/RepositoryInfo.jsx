// src/components/RepositoryInfo.jsx
import React from 'react';
import RepositoryItem from './RepositoryItem';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} />;
};

export default RepositoryInfo;
