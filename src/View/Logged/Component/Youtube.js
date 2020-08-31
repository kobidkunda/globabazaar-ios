
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {BLUESLIGHT, HEIGHT, WHITE, WIDTH} from '../../../Config/theme';

import VideoPlayer from 'react-native-video-player';
import Orientation from "react-native-orientation";


export default class Youtube extends Component {
  static navigationOptions = {
    headerShown: false,
    title: 'Live Class',
    headerStyle: {
      backgroundColor: BLUESLIGHT,
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'MontserratBold',
      color: WHITE,
    },
  };
  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
      isReady: false,
      status: false,
      error: false,
    };
  }


  componentWillUnmount() {
   // Orientation.lockToPortrait();
  }
  componentWillMount() {
    // StatusBar.setHidden(true);
   // Orientation.lockToLandscapeRight();
  }

  componentDidMount(): void {
    console.log(this.props.route.params);
  }

  render() {

    const url =this.props.route.params.youtube_id;

    return (

        <View
            style={{
              width: HEIGHT,
              height:WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#000000'
            }}>

          <StatusBar
              hidden={false}
              translucent={true}
              backgroundColor={'rgba(255,255,255,0.0)'} />


          <VideoPlayer
              video={{ uri: url }}
              autoplay={true}
              fullScreenOnLongPress={true}
              disableFullscreen={false}
              resizeMode={'contain'}
              customStyles={{
                video:{
                  width: HEIGHT,
                  height:WIDTH,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                },
                videoWrapper:{
                  width: HEIGHT,
                  height:WIDTH,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }
              }}

              videoWidth={1800}
              videoHeight={1200}
              thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
          />


        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: WIDTH,
    height: 200,
  },
});
