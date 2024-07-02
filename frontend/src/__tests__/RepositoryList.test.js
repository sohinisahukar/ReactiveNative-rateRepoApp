import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import RepositoryList from '../components/RepositoryList'; // Adjust the import path
import { GET_REPOSITORIES } from '../graphql/queries'; // Adjust the import path

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor:
      'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
  },
  edges: [
    {
      node: {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl:
          'https://avatars2.githubusercontent.com/u/4060187?v=4',
      },
      cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    {
      node: {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl:
          'https://avatars1.githubusercontent.com/u/54310907?v=4',
      },
      cursor:
        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_REPOSITORIES,
    },
    result: {
      data: {
        repositories,
      },
    },
  },
];

describe('RepositoryList', () => {
  describe('RepositoryList', () => {
    it('renders repository information correctly', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <RepositoryList repositories={repositories} />
        </MockedProvider>
      );

      const repositoryItems = await screen.findAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
      expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears');
      expect(firstRepositoryItem).toHaveTextContent('TypeScript');
      expect(firstRepositoryItem).toHaveTextContent('1619');
      expect(firstRepositoryItem).toHaveTextContent('21856');
      expect(firstRepositoryItem).toHaveTextContent('88');
      expect(firstRepositoryItem).toHaveTextContent('3');

      expect(secondRepositoryItem).toHaveTextContent('async-library/react-async');
      expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader');
      expect(secondRepositoryItem).toHaveTextContent('JavaScript');
      expect(secondRepositoryItem).toHaveTextContent('69');
      expect(secondRepositoryItem).toHaveTextContent('1760');
      expect(secondRepositoryItem).toHaveTextContent('72');
      expect(secondRepositoryItem).toHaveTextContent('3');
    });
  });
});
