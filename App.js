/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Route from './src/View/Route';
import stores from './src/Action/Index';
import {Provider} from 'mobx-react';
import Login from './src/View/Auth/Login';
const App: () => React$Node = () => {
  return (
    <>
      <Provider {...stores}>
        <StatusBar barStyle="light-content" />

          <Route />

      </Provider>
    </>
  );
};
export default App;
