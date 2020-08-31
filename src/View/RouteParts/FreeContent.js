import Dashboard from '../Logged/Dashboard';
import Youtube from '../Logged/Component/Youtube';
import Chat from '../Logged/Chat';
import NotificationPage from '../Logged/NotificationPage';
import UpcomingClass from '../Logged/UpcomingClass';
import UpcomingClassDetails from '../Logged/UpcomingClassDetails';
import Profile from '../Logged/Profile';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-elements';

import {createStackNavigator} from '@react-navigation/stack';
import {BLUEDARK, BLUESLIGHT, LIGHTERBLACK, WHITE} from '../../Config/theme';
import {inject, observer} from "mobx-react";
import FreeClass from "../Logged/FreeClass";
const HomeScreenStack = createStackNavigator();

@inject('Auth','User')
@observer


export default class FreeContent extends Component {
  static navigationOptions = {
    tabBarVisible:  false,
    tabBarLabel: ({tintColor, focused, item}) => {
      return focused ? (
        <Text style={styles.labelStylea}>Free</Text>
      ) : (
        <Text style={styles.labelStyle}>Free</Text>
      );
    },
    tabBarIcon: ({focused, tintColor}) =>
      focused ? (
        <Icon
          name="content-save-all"
          type="material-community"
          size={28}
          color={BLUESLIGHT}
        />
      ) : (
        <Icon
          name="content-duplicate"
          type="material-community"
          color={LIGHTERBLACK}
        />
      ),
  };
  render() {
    return (
      <HomeScreenStack.Navigator>
        <HomeScreenStack.Screen
          options={FreeClass.navigationOptions}
          name="FreeClass"
          component={FreeClass}
        />
        <HomeScreenStack.Screen
            options={{headerShown: false}}
            name="Youtube"
            component={Youtube}
        />
        <HomeScreenStack.Screen
          options={{headerShown: false}}
          name="UpcomingClassDetails"
          component={UpcomingClassDetails}
        />
      </HomeScreenStack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  labelStyle: {
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
    color: LIGHTERBLACK,
    fontSize: 12,
  },
  labelStylea: {
    fontFamily: 'Montserrat-Bold',
    textTransform: 'uppercase',
    color: BLUESLIGHT,
    fontSize: 15,
  },
  style: {},
});
