import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Splash from '../Component/Splash';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import Dashboard from './Logged/Dashboard';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class Route extends Component {
  static navigationOptions = {
    title: 'Route',
    headerStyle: {
      backgroundColor: '#2eb79e',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return <Dashboard />;
  }
}

const styles = StyleSheet.create({});
