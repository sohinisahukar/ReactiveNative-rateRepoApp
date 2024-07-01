import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
    </ApolloProvider>
  )
};

export default App;