import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SplashScreen from 'react-native-splash-screen';

import Login from './Auth/Login';
import Register from './Auth/Register';
import {inject, observer} from 'mobx-react';
import 'react-native-gesture-handler';
import Splash from '../Component/Splash';
import ForgotPassword from './Auth/ForgotPassword';
import InitatePayment from './Payment/InitatePayment';
import ConfirmPayment from './Payment/ConfirmPayment';
import DoccuUpload from './DoccumentUpload/DoccuUpload';
import WebPay from './Payment/Payments/WebPay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import SelfForm from './Auth/SelfForm';
import HomeScreen from "./RouteParts/HomeScreen";
import {WHITE} from "../Config/theme";
import FreeContent from "./RouteParts/FreeContent";
import PremiumContent from "./RouteParts/PremiumContent";
import Dashboard from "./Logged/Dashboard";
import Loading from "./Logged/Component/Loading";



const Tab = createBottomTabNavigator();



const Stack = createStackNavigator();
@inject('Auth','User')
@observer
export default class Route extends Component {
  constructor(props) {
    super(props);

  }



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

      const linking = {
          prefixes: ['http://globalbazaar.top/','https://globalbazaar.top/'],
      }

      if (this.props.Auth.logged === true && this.props.User.route === 3){
          return (
              <NavigationContainer translucent linking={linking} fallback={<Loading/>}>
                  <Tab.Navigator
                      tabBarOptions={{
                          activeTintColor:WHITE,
                          activeBackgroundColor:'#FFFFFF',
                          tabStyle:styles.tabStyle,
                          style:styles.style,
                          showLabel:true,

                      }}
                  >
                      <Tab.Screen options={Dashboard.navigationOptions}
                                  name="Dashboard" component={HomeScreen} />
                     <Tab.Screen options={FreeContent.navigationOptions}
                                  name="FreeContent" component={FreeContent} />

                                  <Tab.Screen options={PremiumContent.navigationOptions}
                                  name="PremiumContent" component={PremiumContent} />

                  </Tab.Navigator>
              </NavigationContainer>
          );
      } else if (this.props.Auth.logged === false ){
          return (
              <NavigationContainer linking={linking} fallback={<Loading/>}>
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
              <NavigationContainer linking={linking} fallback={<Loading/>}>
                  <Stack.Navigator>

                      <Stack.Screen options={InitatePayment.navigationOptions} name="InitatePayment" component={InitatePayment} />
                      <Stack.Screen options={ConfirmPayment.navigationOptions} name="ConfirmPayment" component={ConfirmPayment} />
                      <Stack.Screen options={DoccuUpload.navigationOptions} name="DoccuUpload" component={DoccuUpload} />
                      <Stack.Screen options={WebPay.navigationOptions} name="WebPay" component={WebPay} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      }   else if (this.props.Auth.logged === true  && this.props.User.route === 4){
          return (
              <NavigationContainer linking={linking} fallback={<Loading/>}>
                  <Stack.Navigator>

                      <Stack.Screen options={{headerShown: false}} name="SelfForm" component={SelfForm} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      }

      else if (this.props.Auth.logged === true  && this.props.User.route === 2){
          return (
              <NavigationContainer linking={linking} fallback={<Loading/>}>
                  <Stack.Navigator>
                      <Stack.Screen options={DoccuUpload.navigationOptions} name="DoccuUpload" component={DoccuUpload} />
                  </Stack.Navigator>
              </NavigationContainer>
          );
      } else {
          return (
              <Loading syncMessage={this.props.syncMessage}/>
          );
      }

  }
}

const styles = StyleSheet.create({
    tabStyle:{
        backgroundColor:'rgba(16,137,255,0.0)'
    },
    style:{
        height:90

    },
});
