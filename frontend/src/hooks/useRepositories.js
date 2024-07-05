import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network',
      });
    
      if (loading) return { loading, repositories: [] };
      if (error) return { error, repositories: [] };
    
      const repositories = data ? data.repositories.edges.map(edge => edge.node) : [];
    
      return { repositories, loading, error };
};

export default useRepositories;