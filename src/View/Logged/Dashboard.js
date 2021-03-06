import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView, Image, Linking,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as yup from 'yup';
import * as RNLocalize from "react-native-localize";
import { Icon } from 'react-native-elements'

import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import ButtonOutline from '../../Component/ButtonOutline';
import TextPrimary from '../../Component/TextPrimary';
import LinearGradient from 'react-native-linear-gradient';
import {TEXTLG, TEXTLLG, TEXTNLBLACK, TEXTNLBLACKD} from '../../Style/TextStyle';
import CardWithIcons from '../../Component/CardWithIcons';
import {BLUEDARK, BLUESLIGHT, ORANGE, WHITE} from '../../Config/theme';
import Youtube from './Component/Youtube';
import DasboardTeacher from './Component/DasboardTeacher';
import DasboardClass from './Component/DasboardClass';
import {inject, observer} from 'mobx-react';
import ButtonCustomDisabled from '../../Component/ButtonCustomDisabled';
import Modal from 'react-native-modal';
import ButtonCustomWithiconColor from '../../Component/ButtonCustomWithiconColor';
import DashboardSchedule from '../../Component/DashboardSchedule';
let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject('Auth','User')
@observer
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
        liveclass: false,
        liveclassdata: null
    };
  }


 async componentDidMount(): void {
     let _Token = await  this.props.Auth.GetToken();
     let LiveClass = await this.props.User.getLiveClass(_Token);
     console.log(RNLocalize.getLocales());
     console.log(RNLocalize.getCurrencies());

      if (LiveClass !== 'false'){
          console.log(LiveClass);
          console.log('live class');
          this.setState({
              liveclassdata: LiveClass[0],
              liveclass: true
          })
      }


 }

    render() {




    return (
      <LinearGradient
        colors={[
          '#ffffff',
          '#ffffff',
          '#ffffff',
        ]}
        style={{
          width: WIDTH,
          height: HEIGHT,
          alignSelf: 'stretch',
        }}>
        <StatusBar
          hidden={false}
          translucent={true}
          backgroundColor={'rgba(255,255,255,0.14)'}
        />
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              position: 'absolute',
              right: -120,
            }}>
            <Image
              style={{
                width: WIDTH+120,
                height: 230,

              }}
              source={require('../../Assets/Images/main-texture-gradient.png')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              flex: 1.3,
              paddingLeft: 22,
            }}>
            <TEXTLG>Hello</TEXTLG>
            <TEXTLLG>{this.props.User.fname} {this.props.User.fname}</TEXTLLG>
          </View>

          <View
            style={{
              flex: 0.5,
            }}>
            <Grid>
              <Col
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <CardWithIcons
                    onPress={() => this.props.navigation.navigate('UpcomingClass')}
                    bgcolor={BLUEDARK}
                  text={'Schedule'}
                  iconname={'television'}
                />
              </Col>

              <Col
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <CardWithIcons
                    onPress={() => this.props.navigation.navigate('Profile')}
                  bgcolor={BLUESLIGHT}
                  text={' Profile'}
                  iconname={'account'}
                />
              </Col>
              <Col
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <CardWithIcons
                    onPress={() => this.props.navigation.navigate('NotificationPage')}
                    bgcolor={ORANGE}
                  text={'Alerts'}
                  iconname={'bell'}
                />
              </Col>
            </Grid>
          </View>

          <View
            style={{
              flex: 0.6,
                paddingTop:30
            }}>
              <View style={{
                  paddingLeft:30
              }}>
                  <TEXTNLBLACK>Teachers</TEXTNLBLACK>
              </View>

            <DasboardTeacher />
          </View>

          <View
            style={{
              flex: 2,
              paddingTop: 50,
            }}>

              <View style={{
                  paddingLeft:20

              }}>
                  <TEXTNLBLACK>Live Classes</TEXTNLBLACK>
              </View>
              <DasboardClass  navigation={this.props.navigation} count={3}/>

          </View>

            <LinearGradient
                colors={[BLUESLIGHT, BLUEDARK]}
                style={{
                width:60,
                height:60,
                backgroundColor:BLUEDARK,
                position:'absolute',
                bottom:60,
                right:10,
                borderRadius:100,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,

                elevation: 24,

            }}>

                <Icon
                    containerStyle={{

                    }}
                    name='chat-bubble-outline'
                    type='material'
                    color={WHITE}
                    onPress={() => this.props.navigation.navigate('Chat')}
                    size={30}
                    solid
                    reverseColor={BLUEDARK}
                />
            </LinearGradient>


        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({});
