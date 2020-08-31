import React, {Component, PropTypes} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Orientation from 'react-native-orientation';
import Video from 'react-native-video';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let FORWARD_DURATION = 7;

export default class VideoPlayer extends Component {
  constructor(props, context, ...args) {
    super(props, context, ...args);
    this.state = {paused: false, tabBarVisible: true};
  }

  state = {
    tabBarVisible: true,
  };

  componentDidMount() {
    Orientation.lockToLandscapeLeft();
    this.props.navigation.setParams({tabBarVisible: !this.state.tabBarVisible});
    console.log(this.props);
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }
  componentWillMount() {
    // StatusBar.setHidden(true);
    Orientation.lockToLandscapeLeft();
  }

  onVideoEnd() {
    this.videoPlayer.seek(0);
    this.setState({key: new Date(), currentTime: 0, paused: true});
  }

  onVideoLoad(e) {
    this.setState({currentTime: e.currentTime, duration: e.duration});
  }

  onProgress(e) {
    this.setState({currentTime: e.currentTime});
  }

  playOrPauseVideo(paused) {
    this.setState({paused: !paused});
  }
  onBackward(currentTime) {
    let newTime = Math.max(currentTime - FORWARD_DURATION, 0);
    this.videoPlayer.seek(newTime);
    this.setState({currentTime: newTime});
  }
  onForward(currentTime, duration) {
    if (currentTime + FORWARD_DURATION > duration) {
      this.onVideoEnd();
    } else {
      let newTime = currentTime + FORWARD_DURATION;
      this.videoPlayer.seek(newTime);
      this.setState({currentTime: newTime});
    }
  }
  getCurrentTimePercentage(currentTime, duration) {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  }

  onProgressChanged(newPercent, paused) {
    let {duration} = this.state;
    let newTime = (newPercent * duration) / 100;
    this.setState({currentTime: newTime, paused: paused});
    this.videoPlayer.seek(newTime);
  }
  onLayout(e) {
    const {width, height} = Dimensions.get('window');
  }

  goBack = () => {
    this.props.navigation.goBack();
    Orientation.lockToPortrait();
  };
  // navigation options
  static navigationOptions = {
    headerShown: false,
    tabBarVisible: false,
  };

  // render
  render() {
    let {onClosePressed, video, volume} = this.props;
    let {currentTime, duration, paused} = this.state;
    const completedPercentage =
      this.getCurrentTimePercentage(currentTime, duration) * 100;

    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={styles.fullScreen}
        key={this.state.key}>
        <StatusBar
        //  hidden={false}
        //  translucent={true}
        //  backgroundColor={'rgba(255,255,255,0.14)'}
        />
        <Video
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          onEnd={this.onVideoEnd.bind(this)}
          onLoad={this.onVideoLoad.bind(this)}
          onProgress={this.onProgress.bind(this)}
          source={{uri: this.props.route.params.youtube_id}}
          paused={paused}
          controls={true}
        //  fullscreenAutorotate={true}
          hideShutterView={true}
          fullscreenOrientation={'landscape'}

          // source={{uri: this.props.route.params.youtube_id}}
          resizeMode={'cover'}
          toggleResizeModeOnFullscreen={true}
          navigator={this.props.navigation}
          repeat={true}
          reportBandwidth={true}
          fullscreen={true}
          // volume={Math.max(Math.min(1, volume), 0)}
          // resizeMode="none"
          style={
            Platform.OS === 'android'
              ? styles.videoContainerAndroid
              : styles.videoContainerIOS
          }
        />

        {paused && <View style={styles.pauseImageWrapper} />}
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height ,
  },
  videoContainerAndroid: {
    position: 'absolute',
    width: width + 20,
    height: height + 20,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoContainerIOS: {
    transform: [{rotate: '90deg'}],
  },
  videoIcon: {
    width: 50,
    height: 50,
  },
  pauseImageWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  backButtonWrapper: {
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
  },
});
