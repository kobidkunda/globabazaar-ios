import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {BLUESLIGHT, WHITE, WIDTH} from '../../../Config/theme';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

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

  componentDidMount(): void {
    console.log(this.props.route.params);
  }

  render() {
    return (

      <View
        style={{
          flex: 1,
          width: WIDTH,
          marginTop:30
        }}>
        {/*<YouTube
          showFullscreenButton={true}
          videoId={this.props.route.params.youtube_id} // The YouTube video ID
          play // control playback of video with true/false
          apiKey={'AIzaSyBcZarfeGu9rdHgpkuulDETqMaHreL9tnw'}
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => this.setState({isReady: true})}
          onChangeState={e => this.setState({status: e.state})}
          onChangeQuality={e => this.setState({quality: e.quality})}
          onError={e => this.setState({error: e.error})}
          style={{alignSelf: 'stretch', height: 300}}
          lightboxMode={true}
        />*/}

        <VideoPlayer
          fullscreenAutorotate={true}
          fullscreenOrientation={'landscape'}
          source={{uri: this.props.route.params.youtube_id}}
          toggleResizeModeOnFullscreen={true}
          navigator={this.props.navigation}
          reportBandwidth={true}
        />
        {/* <Video
          source={{uri: this.props.route.params.youtube_id}} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          controls={true}
          playInBackground={true}
          pictureInPicture={true}
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          resizeMode={'contain'}
          fullscreen={true}
          fullscreenAutorotate={true}
          fullscreenOrientation={'landscape'}
        />*/}
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
