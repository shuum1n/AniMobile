import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MainStack from './navigator/MainStack';

const client = new ApolloClient({
  uri: 'http://18.141.229.16/',
  cache: new InMemoryCache(),
});


export default function App()
{
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack></MainStack>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
