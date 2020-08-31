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
import Loading from "../Logged/Component/Loading";

const HomeScreenStack = createStackNavigator();
const hiddenTabBars = ['Youtube', 'Route2']

@inject('Auth','User')
@observer

export default class HomeScreen extends Component {



   static navigationOptions = {
         tabBarVisible: false,
         tabBarLabel: ({tintColor, focused, item}) => {
             return focused ? (
                 <Text style={styles.labelStylea}>Home</Text>
             ) : (
                 <Text style={styles.labelStyle}>Home</Text>
             );
         },
         tabBarIcon: ({focused, tintColor}) =>
             focused ? (

                 <Icon name="home" type="foundation" size={32} color={BLUESLIGHT} />
             ) : (
                 <Icon name="home" type="antdesign" color={LIGHTERBLACK} />
             ),
     };

  render() {
    return (
      <HomeScreenStack.Navigator>
        {/*<HomeScreenStack.Screen
          options={{headerShown: false, tabBarVisible: false,}}
          name="Loading"
          component={Loading}
        />
*/}
        <HomeScreenStack.Screen
          options={{headerShown: false}}
          name="Dashboard"
          component={Dashboard}
        />
        <HomeScreenStack.Screen
          options={Youtube.navigationOptions}
          name="Youtube"
          component={Youtube}
        />
        <HomeScreenStack.Screen
          options={Chat.navigationOptions}
          name="Chat"
          component={Chat}
        />
        <HomeScreenStack.Screen
          options={NotificationPage.navigationOptions}
          name="NotificationPage"
          component={NotificationPage}
        />
        <HomeScreenStack.Screen
          options={UpcomingClass.navigationOptions}
          name="UpcomingClass"
          component={UpcomingClass}
        />
          <HomeScreenStack.Screen
              options={{headerShown: false}}
              name="UpcomingClassDetails"
              component={UpcomingClassDetails}
          />
        <HomeScreenStack.Screen name="Profile" component={Profile} />
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
