import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Routine from './screens/Routine';

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: "http://192.168.1.85:5000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <View className="flex-1 items-center justify-center bg-white">
          <Routine/>
          <StatusBar style="auto" />
        </View>
      </ApolloProvider>
    </>
  );
}
