import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Logged/Profile';
import SplashScreen from 'react-native-splash-screen';
import Dashboard from './Logged/Dashboard';
import Login from './Auth/Login';
import Register from './Auth/Register';
import {inject, observer} from 'mobx-react';
import 'react-native-gesture-handler';
import Splash from '../Component/Splash';
import ForgotPassword from './Auth/ForgotPassword';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
const Stack = createStackNavigator();
@inject('Auth')
@observer
export default class Route extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {

      if (this.props.Auth.logged === true){
          return (
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen options={{headerShown: false}}  name="Dashboard" component={Dashboard} />
                      <Stack.Screen   name="Profile" component={Profile} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      } else if (this.props.Auth.logged === false){
          return (
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen options={{headerShown: false}}  name="Login" component={Login} />
                      <Stack.Screen options={{headerShown: false}}  name="Register" component={Register} />
                      <Stack.Screen options={{headerShown: false}}  name="ForgotPassword" component={ForgotPassword} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      } else {
          return (
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen options={{headerShown: false}}  name="Login" component={Splash} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      }

  }
}

const styles = StyleSheet.create({});
