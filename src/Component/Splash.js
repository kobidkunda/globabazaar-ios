import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import LottieView from 'lottie-react-native';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class Splash extends Component {
  async componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:

  }

  render() {
    return (
      <ImageBackground
        style={{
          width: WIDTH,
          height: HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../Assets/Images/launch_screen.png')}>
        <View
          style={{
            flex: 1,
          }}>
          <StatusBar
            hidden={false}
            translucent={true}
            backgroundColor={'rgba(255,255,255,0.0)'}
          />

          <View
            style={{
              marginTop: HEIGHT - 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              style={{
                height: 150,
                width: 150,
              }}
              ref={animation => {
                this.animation = animation;
              }}
              source={require('../Assets/lottie/lf30_editor_l54CXx')}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
