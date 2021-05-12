/**
 * Sample React Native App
 * https://github.com/facebook/react-natvive
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import InitialStack from './src/components/InitialStack.js';
import reducer from './src/reducers/index';

const initialState = {
  user: {},
  calendar: [],
  configuration: [],
  content: [],
  news: [],
  storeItem: [],
  yourShopping: [],
  funFacts: {},
}

const store = createStore(reducer, initialState)

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode='none' initialRouteName="Inicio" mode='modal'>
            <Stack.Screen name='Inicio' component={InitialStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
