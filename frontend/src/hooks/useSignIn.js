// src/hooks/useSignIn.js
import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    try {
        const { data } = await mutate({
          variables: { credentials: { username, password } },
        });

        if (data && data.authenticate) {
            await authStorage.setAccessToken(data.authenticate.accessToken);
            await apolloClient.resetStore();
          }

        return data;
      } catch (error) {
        throw new Error(error);
      }
  };

  return [signIn, result];
};

export default useSignIn;
