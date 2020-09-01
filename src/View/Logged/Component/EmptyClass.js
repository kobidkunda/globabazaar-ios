import React, {Component} from 'react';
import {BLUEDARK, BLUESLIGHT, HEIGHT, WIDTH} from '../../../Config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {Image, StatusBar, View} from 'react-native';
import Shimmer from 'react-native-shimmer';
import LottieView from 'lottie-react-native';

export default class EmptyClass extends Component {
    async componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        flex: 1,
                        //marginTop: HEIGHT - 250,
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
                        source={require('../../../Assets/lottie/no-class.json')}
                    />
                </View>
            </View>
        );
    }
}
