import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {BLUESLIGHT, WHITE} from '../../../Config/theme';

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
        <YouTube
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
