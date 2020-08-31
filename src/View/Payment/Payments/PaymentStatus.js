import React, {Component} from 'react';
import {View, StyleSheet, Text, Vibration} from 'react-native';
import {
    Container,
    COLORTEXTSM,
    TEXTLG,
    COLOR1, HEIGHT, WIDTH,
} from '../../../../../../Style/theme';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';
import QRCode from 'react-native-qrcode-svg';


import {inject, observer} from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';
import ButtonGradient from '../../../../../../Style/ButtonGradient';
import LinearGradient from "react-native-linear-gradient";
import OrderCart from '../../../../../../Style/OrderCart';

@inject("Auth")
@observer

export default class PaymentStatus extends Component {

    static   navigationOptions: {
        headerShown: false,
    }

    constructor(props) {
        super(props);

        this.state = {
            data: '',
        };
    }

    async componentDidMount() {

        if (this.props.status === 'success'){
            this.animation.play();
            this.animatione.play();

            Sound.setCategory('Playback');

            let whoosh = new Sound(
                'successful.mp3',
                Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        return;
                    }
                    // loaded successfully
                    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

                    // Play the sound with an onEnd callback
                    whoosh.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                        } else {
                            console.log('playback failed due to audio decoding errors');
                        }
                    });
                });

            whoosh.play();
            console.log('plaved')
            console.log(this.props.order)

            Vibration.vibrate(70);
        }



        // Or set a specific startFrame and endFrame with:
        // this.animation.play(0, 333);
    }




    OnTaskComplete = async  () => {

    }

    render() {
        return (
            <View style={{
                width: '100%',
                flex:1
            }}>




                <View
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        justifyContent: 'center',
                        width: '100%',
                        backgroundColor: 'rgb(255,255,255)',

                    }}>


                    {/*here*/}


                    {/*here*/}



                    <View style={{
                        flex:1,
                        justifyContent: 'center',
                        alignItems: 'center',

                        //  backgroundColor: 'rgb(255,255,255)',
                    }}>

                        <LottieView
                            style={styles.lottiefile}
                            ref={animation => {
                                this.animation = animation;
                            }}
                            loop={false}
                            source={require('../../../../../../Asset/lottie/success')}
                        />
                        <Text style={{color: COLOR1,
                            fontFamily: 'MontserratSemiBold',
                            fontSize:20,
                            textTransform: 'uppercase',
                        }}>{this.props.confirmtitle}</Text>
                    </View>



                    <LinearGradient
                        colors={['#006ac4', '#0073c4', '#0094ff']} style={{
                        flex:2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:20

                        // backgroundColor: 'rgb(0,133,233)',
                    }}>




                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:20,
                            //  backgroundColor:'#ffffff',
                            borderRadius:20
                        }}>
                            <View style={{

                                flex:1,
                                marginTop:20,
                                borderWidth:1,
                                borderColor:'#ffffff',
                                width: 120,
                                height: 120,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius:10

                            }}>

                                <View style={{

                                    padding:5,
                                    backgroundColor:'#ffffff',
                                    width: 120,
                                    height: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius:10,
                                    elevation:20
                                }}>
                                    <QRCode
                                        size={100}
                                        color={COLOR1}
                                        style={{


                                        }}
                                        value="http://awesome.link.qr"
                                    />

                                </View>
                            </View>

                            <View  style={{
                                flex:3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin:20

                                //   backgroundColor: 'rgb(255,255,255)', '#006ac4', '#0073c4', '#0094ff'
                            }}>
                                <OrderCart
                                    color1={'#ffffff'}
                                    color2={'#ffffff'}
                                    color3={'#ffffff'}
                                    title={'Order Summery'}
                                    title1={'Order ID'}
                                    value1={this.props.paymentid}
                                    title2={'PAYMENT'}
                                    value2={this.props.paymentstatus}
                                    title3={'total'}
                                    value3={'₹'+this.props.order.order_total}
                                    title4={'buss Vol'}
                                    value4={this.props.order.order_total_bv}
                                />


                                <OrderCart
                                    color1={'#ffffff'}
                                    color2={'#ffffff'}
                                    color3={'#ffffff'}
                                    title={'Delivery Summery'}
                                    title1={'Delivery ID'}
                                    value1={this.props.paymentid}
                                    title2={'Shipping'}
                                    value2={'Store Pickup'}
                                    title3={'Time'}
                                    value3={'Now'}
                                    title4={'Que Position'}
                                    value4={'4'}
                                />
                            </View>

                            <View
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0)',
                                    position: 'absolute',
                                    height: '90%',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    top:0,
                                    left:0,
                                    elevation:400
                                }}
                            >
                                <LottieView
                                    ref={(animatione) => {
                                        this.animatione = animatione;
                                    }}
                                    loop={false}
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0)',
                                        // backgroundColor: 'yellow',
                                        // position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        top:0,
                                        // justifyContent: 'flex-end',
                                    }}
                                    source={require('../../../../../../Asset/lottie/sprinkle')}
                                    // source={require('../../../../../../Asset/lottie/sprink')}
                                    resizeMode="cover"
                                />
                            </View>


                            <View  style={{
                                flex:0.3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin:20

                                //   backgroundColor: 'rgb(255,255,255)',
                            }}>
                                <ButtonGradient

                                    onPre={() => this.props.navigation.navigate('Dashboard')}
                                    title={'Homepage'}
                                />
                            </View>





                        </View>





                    </LinearGradient>









                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lottiefile: {
        width: 200,
        height: 200,
    },
});
