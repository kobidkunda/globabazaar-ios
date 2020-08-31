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
    TEXTLLGWHITEVVGV, TEXTLLGWHITEVVGVC,
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
import ButtonCustomWithiconColorShine from "../../Component/ButtonCustomWithiconColorShine";
import Shimmer from "react-native-shimmer";
import MaskedView from "@react-native-community/masked-view";
@inject('Auth','User','Class')
@observer
export default class UpcomingClassDetails extends Component {
  static navigationOptions = {
    title: 'UpcomingClass',
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

 async componentDidMount(): void {




   let _Token = await  this.props.Auth.GetToken();

   let classDetails = await this.props.Class.upcomingClassDETAILS(_Token,this.props.route.params.id);
   console.log(classDetails.seminars.seminar_to_teacher.name);

   this.setState({
     data:classDetails.seminars,
     teacher:classDetails.seminars.seminar_to_teacher,
       loading: false
   })




  }

   addevent = async() => {

    this.setState({
      loading: true
    });

    let Permissionstatus = await RNCalendarEvents.authorizationStatus();
       // let kkk =  await  RNCalendarEvents.authorizationStatus();
   // let kkk =  await  RNCalendarEvents.authorizeEventStore();
    console.log(Permissionstatus);

       this.setState({
           loading: false
       })

    if (Permissionstatus === 'authorized' ){
       await RNCalendarEvents.saveEvent(
           this.state.data.title+ ' by '+ this.state.teacher.name, {
        startDate: this.state.data.date+'T19:26:00.000Z',
        endDate: this.state.data.date+'T19:26:00.000Z',
           notes: this.state.data.title+ ' by '+ this.state.teacher.name,
           alarms: [{
               date: this.state.data.date+'T19:26:00.000Z'
           }]
       });

      Alert.alert(
          "Remainder set on "+ this.state.data.date,
          " We will remind you about the live class on "+ this.state.data.date,
          [
            { text: "Got It", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
      );
    } else {
        await  RNCalendarEvents.authorizeEventStore();
        await RNCalendarEvents.saveEvent(this.state.data.title+ ' by '+ this.state.teacher.name, {
            startDate: this.state.data.date+'T19:26:00.000Z',
            endDate: this.state.data.date+'T19:26:00.000Z'
        });
        Alert.alert(
            "Remainder set on "+ this.state.data.date,
            " We will remind you about the live class on "+ this.state.data.date,
            [
                { text: "Got It", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        )
    }


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
            backgroundColor={'rgba(155,155,155,0.0)'}
          />
          <ImageBackground
            style={{
              flex: 1,
              width: WIDTH,
              height: HEIGHT / 2,

              // borderBottomRightRadius:80
            }}

            source={
              this.state.data.image === null ? (
                  require('../../Assets/Images/bg-class.jpg')) : ({uri: BASE_URL + this.state.data.image})

            }>
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
                  flex: 2,
                  padding: 5,

                  marginTop: HEIGHT / 4,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',

                }}>
                <Grid
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start'

                  }}>
                  <Col size={100} style={{

                      opacity:0.7,
                      backgroundColor:'#000000',height:150
                  }}>
                   <View style={{
                       flex:1,
                       flexDirection: 'column',
                       padding:11,
                       justifyContent: 'space-around',
                       alignItems: 'center',

                   }}>
                       <MaskedView
                           style={{flex: 1, flexDirection: 'row', height: 50, width: WIDTH-60}}
                           maskElement={
                               <View
                                   style={{

                                       // Transparent background because mask is based off alpha channel.
                                       backgroundColor: 'transparent',
                                       flex: 1,
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                   }}>
                       <Shimmer intensity={0.4} tilt={7} opacity={0.8}>

                       <TEXTLLGWHITEVVGVC>{this.state.data.title}</TEXTLLGWHITEVVGVC>
                       </Shimmer>
                               </View>
                           }>
                           {/* Shows behind the mask, you can put anything here, such as an image */}
                           <Image
                               style={{
                                   width: WIDTH,
                                 //  height: 100,
                               }}
                               source={require('../../Assets/Images/golden.jpg')}
                           />
                       </MaskedView>
                       <TEXTLLGWHITEVV> {this.state.teacher.name}</TEXTLLGWHITEVV>
                       <TEXTLLGWHITEVV>{this.state.data.start_date_time}</TEXTLLGWHITEVV>
                   </View>
                  </Col>
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
            Time:   {this.state.data.start_date_time}
            </Text>

              <Text>
              {this.state.data.lecture}
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


                <ButtonCustomWithiconColorShine title={'Play Lecture'}
                                           loading={this.state.loading}
                                           onPre={() => this.props.navigation.navigate('Youtube',{
                                               youtube_id: this.state.data.video,
                                           })}
                                           iconname={'playcircleo'}
                                           type={'antdesign'}
                                           color1={BLUESLIGHT}
                                           color2={BLUEDARK}
                                           color3={BLUESLIGHT}
                />





            </View>




        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
