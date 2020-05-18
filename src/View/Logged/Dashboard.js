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
    KeyboardAvoidingView, Image,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as yup from 'yup';
import {Formik} from 'formik';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import ButtonOutline from '../../Component/ButtonOutline';
import TextPrimary from '../../Component/TextPrimary';
import LinearGradient from 'react-native-linear-gradient';
import {TEXTLG, TEXTLLG, TEXTNLBLACK} from '../../Style/TextStyle';
import CardWithIcons from '../../Component/CardWithIcons';
import {BLUEDARK, BLUESLIGHT, ORANGE} from '../../Config/theme';
import Youtube from './Component/Youtube';
import DasboardTeacher from './Component/DasboardTeacher';
import DasboardClass from './Component/DasboardClass';
import {inject, observer} from 'mobx-react';
import ButtonCustomDisabled from '../../Component/ButtonCustomDisabled';
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
console.log('llii');
     //console.log(LiveClass)
      if (LiveClass !== false){
          console.log(LiveClass);
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
              flex: 2.5,
              paddingTop: 50,
            }}>

              <View style={{
                  paddingLeft:20

              }}>
                  <TEXTNLBLACK>Upcoming Classes</TEXTNLBLACK>
              </View>
              <DasboardClass/>

          </View>

            <View
            style={{
              flex: 0.5,
              paddingTop: 20,
            }}>
                {this.state.liveclass === true? (
                    <ButtonCustom onPre={() => this.props.navigation.navigate('Youtube',{
                        youtube_id: this.state.liveclassdata.youtube_id,
                        }
                    )} title={'View Live Class'}/>
                ): (
                    <ButtonCustomDisabled title={'No Live Class'}/>
                )}



          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({});
