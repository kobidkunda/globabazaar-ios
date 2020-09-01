
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {BLUESLIGHT, HEIGHT, WHITE, WIDTH} from '../../../Config/theme';

import VideoPlayer from 'react-native-video-player';
import {Icon} from "react-native-elements";


export default class Youtube extends Component {
  static navigationOptions = {
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
              width: WIDTH,
              height:HEIGHT,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#000000'
            }}>
            <View style={{
                position:'absolute',
                top:50,
                left:8
            }}>
                <Icon
                    onPress={() => this.props.navigation.goBack()}
                    name='leftcircleo'
                    type='antdesign'
                    size={44}
                    color='#ffffff'

                />
            </View>
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
                  width: WIDTH,
                  height:HEIGHT-200,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                },
                videoWrapper:{
                    width: WIDTH,
                    height:HEIGHT-200,
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
