import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image, Linking, Alert,
} from 'react-native';
import DasboardClass from './Component/DasboardClass';
import {BLUEDARK, BLUESLIGHT, HEIGHT, WHITE, WIDTH} from '../../Config/theme';
import {
  TEXTLLGWHITEP,
  TEXTLLGWHITEVV,
  TEXTLLGWHITEVVGV,
  TEXTNLBLACKD,
} from '../../Style/TextStyle';
import {Avatar} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import RNCalendarEvents from 'react-native-calendar-events';
import {inject, observer} from 'mobx-react';
import ButtonCustom from '../../Component/ButtonCustom';
import ButtonCustomWithiconColor from '../../Component/ButtonCustomWithiconColor';
import {BASE_URL} from '../../Config/URL';
import ButtonCustomDisabled from "../../Component/ButtonCustomDisabled";
@inject('Auth','User','Class')
@observer
export default class FreeClass extends Component {
  static navigationOptions = {
    title: 'FreeClass',
    headerStyle: {
      backgroundColor: BLUESLIGHT,
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
      teacher:[],
        loading: true
    };
  }





  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#dcdcdc',
        }}>
        <View
          style={{
            flex: 1,
            // borderBottomLeftRadius:30
          }}>
          <StatusBar
            hidden={false}
            translucent={true}
            backgroundColor={'rgba(155,155,155,0.7)'}
          />
          <ImageBackground
            style={{
              flex: 1,
              width: WIDTH,
              height: HEIGHT / 2,

              // borderBottomRightRadius:80
            }}

            source={ require('../../Assets/Images/rlk.jpg')}>
            <View
              style={{
                flex: 1,
                width: WIDTH,
                backgroundColor: 'rgba(0,0,0,0.22)',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  flex: 1,
                  padding: 5,
                  marginTop: HEIGHT / 2.8,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                }}>
                <Grid
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}>
                  <Col size={100}>
                    <TEXTLLGWHITEVVGV>Free Class</TEXTLLGWHITEVVGV>
                  </Col>
                </Grid>

                <Grid
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}>
                  <Col size={75}>
                      <TEXTLLGWHITEVV>By Emporium</TEXTLLGWHITEVV>
                  <Col size={25}>
                    <Avatar
                      rounded
                      source={ {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>

                  </Col>
                </Grid>

                <Grid
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}>
                  <TEXTLLGWHITEVV>hhjhj</TEXTLLGWHITEVV>
                </Grid>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            marginTop: 20,
            marginLeft: 5,
            marginRight: 5,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              paddingLeft: 20,
                paddingTop:20
            }}>
            <TEXTNLBLACKD>Description</TEXTNLBLACKD>
            <Text>
            Time:
            </Text>

              <Text>

            </Text>
          </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                width:WIDTH-10
            }}>
                <ButtonCustomWithiconColor title={'Remind Me'}
                                           loading={this.state.loading}
                                           onPre={() => this.addevent()}
                                           iconname={'calendar'}
                                           type={'material-community'}
                                           color1={'#54B666'}
                                           color2={'#54B666'}
                                           color3={'#54B666'}
                />

                <ButtonCustom
                    loading={this.state.loading}
                    onPre={() => this.props.navigation.navigate('Youtube',{
                            youtube_id: this.state.data.youtube_id,
                        }
                    )} title={'View Live Class'}/>




            </View>




        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
