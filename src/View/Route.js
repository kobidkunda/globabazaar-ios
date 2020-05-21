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
import InitatePayment from './Payment/InitatePayment';
import ConfirmPayment from './Payment/ConfirmPayment';
import DoccuUpload from './DoccumentUpload/DoccuUpload';
import Youtube from './Logged/Component/Youtube';
import OneSignal from 'react-native-onesignal';
import WebPay from './Payment/Payments/WebPay';
import UpcomingClass from './Logged/UpcomingClass';
import UpcomingClassDetails from './Logged/UpcomingClassDetails';
import NotificationPage from './Logged/NotificationPage';


const Stack = createStackNavigator();
@inject('Auth','User')
@observer
export default class Route extends Component {
  constructor(props) {
    super(props);
      OneSignal.init('5a214dde-c22d-4701-9716-10280440ccfe', {
          kOSSettingsKeyAutoPrompt: false,
      }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
  }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived = notification => {
        console.log('Notification received: ', notification);
    };

    onOpened = openResult => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    };

    onIds = async device => {
        console.log('Device info: ', device);

        this.props.User.device_uuid = device.userId


        //   this.Sendtoken(device).then(r => console.log('jjj'));
    };

 async componentDidMount(): void {
     await SplashScreen.hide();
      let Config =  await this.props.Auth.GetConfig();
      let _TOKEN =  await this.props.Auth.GetToken();
      if (await this.props.Auth.CheckOnline() === true &&
          _TOKEN !== null
          && await this.props.User.getUserDetails(_TOKEN)  === true){

          let checkroute = await this.props.User.CheckRoute();
          this.props.Auth.logged =  true;

      } else {
          this.props.Auth.logged =  false;
      }


  }

  render() {

      if (this.props.Auth.logged === true && this.props.User.route === 3){
          return (
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen options={{headerShown: false}}  name="Dashboard" component={Dashboard} />
                      <Stack.Screen options={Youtube.navigationOptions}  name="Youtube" component={Youtube} />
                      <Stack.Screen options={NotificationPage.navigationOptions}  name="NotificationPage" component={NotificationPage} />
                      <Stack.Screen options={UpcomingClass.navigationOptions}  name="UpcomingClass" component={UpcomingClass} />
                      <Stack.Screen  options={{headerShown: false}}  name="UpcomingClassDetails" component={UpcomingClassDetails} />
                      <Stack.Screen   name="Profile" component={Profile} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      } else if (this.props.Auth.logged === false ){
          return (
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen options={{headerShown: false}}  name="Login" component={Login} />
                      <Stack.Screen options={{headerShown: false}}  name="Register" component={Register} />
                      <Stack.Screen options={{headerShown: false}}  name="ForgotPassword" component={ForgotPassword} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      }
      else if (this.props.Auth.logged === true  && this.props.User.route === 1){
          return (
              <NavigationContainer>
                  <Stack.Navigator>

                      <Stack.Screen options={InitatePayment.navigationOptions} name="InitatePayment" component={InitatePayment} />
                      <Stack.Screen options={ConfirmPayment.navigationOptions} name="ConfirmPayment" component={ConfirmPayment} />
                      <Stack.Screen options={DoccuUpload.navigationOptions} name="DoccuUpload" component={DoccuUpload} />
                      <Stack.Screen options={WebPay.navigationOptions} name="WebPay" component={WebPay} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      }

      else if (this.props.Auth.logged === true  && this.props.User.route === 2){
          return (
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen options={DoccuUpload.navigationOptions} name="DoccuUpload" component={DoccuUpload} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      } else {
          return (
              <Splash syncMessage={this.props.syncMessage}/>
          );
      }

  }
}

const styles = StyleSheet.create({});
