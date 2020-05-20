import React, {Component} from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import {inject, observer} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import {TEXTLLGWHITEP, TEXTNLBLACK, TEXTNLBLACKD} from '../../../Style/TextStyle';
import {BLUESLIGHT, LIGHTERBLACK, WHITE, WIDTH} from '../../../Config/theme';

@inject("Auth")
@observer

export default class PaymentLoading extends Component {

    static navigationOptions = {
        title: 'Payment Confirm',
        headerShown: false,
        headerStyle: {
            backgroundColor: BLUESLIGHT,
        },
        headerTintColor: BLUESLIGHT,
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'MontserratBold',
            color: WHITE,
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            data: '',
        };
    }

    async componentDidMount() {


        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        this.animation.play(0, 333);
    }




    OnTaskComplete = async  () => {

    }

    render() {
        return (
            <View style={{
                width: '100%',
                flex:1,
            }}>

                <View
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        justifyContent: 'center',
                        width: '100%',
                        backgroundColor: 'rgb(255,255,255)',
                    }}>
                    <StatusBar
                        hidden={false}
                        translucent={false}
                        backgroundColor={'rgba(148,148,148,0.71)'}
                        />

                    <View style={{

                        flex:3,
                        backgroundColor: 'rgb(255,255,255)',
                        justifyContent: 'center',
                        alignItems:'center'
                    }}>
                        <LottieView
                            style={styles.lottiefile}
                            ref={animation => {
                                this.animation = animation;
                            }}
                            source={require('../../../Assets/lottie/6849-pos.json')}
                        />
                    </View>
                    <View  style={{
                        flex:1,
                        backgroundColor: 'rgb(255,255,255)',
                        justifyContent: 'center',
                        alignItems:'center'
                    }}>
                        <TEXTNLBLACKD>Verifying Payment</TEXTNLBLACKD>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lottiefile: {
        width: WIDTH,
        height: 300,
    },
});
