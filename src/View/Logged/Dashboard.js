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
  KeyboardAvoidingView,
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
let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
    };
  }
  OnLogin = async values => {
    console.log(values);
    this.setState({
      editable: false,
      otpsent: true,
      loading: false,
    });
  };

  inputs = {};
  // function to focus the field
  focusTheField = id => {
    this.inputs[id].focus();
  };

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
              right: 0,
            }}>
            <ImageBackground
              style={{
                width: 200,
                height: 165,
              }}
              source={require('../../Assets/Images/dashbordtop.png')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              flex: 1,
              paddingLeft: 22,
            }}>
            <TEXTLG>Hello</TEXTLG>
            <TEXTLLG>Anjan Kumar</TEXTLLG>
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
                  text={'Live Class'}
                  iconname={'television'}
                />
              </Col>

              <Col
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <CardWithIcons
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
                  text={'Remainder'}
                  iconname={'calendar'}
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

                <ButtonCustom title={'No Live Class'}/>

          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({});
