import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {BLUESLIGHT, WHITE} from '../../../Config/theme';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

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

  componentDidMount(): void {
    console.log(this.props.route.params);
  }

  render() {
    return (
      <View>
        <VideoPlayer
          fullscreenAutorotate={true}
          fullscreenOrientation={'landscape'}
          source={{uri: this.props.route.params.youtube_id}}
          toggleResizeModeOnFullscreen={true}
          navigator={this.props.navigation}
          reportBandwidth={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
