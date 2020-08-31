
import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    ScrollView,
} from 'react-native';
import {
    BLUEDARK,
    BLUESLIGHT,
    LIGHTERBLACK,
    WHITE,
    YELLOW,
} from '../../Config/theme';
import {
    TEXTLG,
    TEXTLLG,
    TEXTLLGWHITE,
    TEXTLLGWHITEP,
    TEXTLLlG,
    TEXTNL,
} from '../../Style/TextStyle';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../../Component/ButtonCustom';
import {inject, observer} from 'mobx-react';
import UserHeap from './UserHeap';
import LottieView from "lottie-react-native";

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject('Auth','User','Payment')
@observer
export default class ConfirmPayment extends Component {
    static navigationOptions = {
        title: 'Payment Successful',
        headerStyle: {
            backgroundColor: BLUESLIGHT,
        },
        headerTintColor: BLUESLIGHT,
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Montserrat-Bold',
            color: WHITE,
        },
    };

    CreateOrder = async () => {
        /*this.setState({
            loading: true
        });
        let _TOKEN =  await this.props.Auth.GetToken();
        let Create_order = await this.props.Payment.CreatePayment(_TOKEN);
        console.log(Create_order)
        this.setState({
            loading: false
        });*/
        this.props.navigation.navigate('DoccuUpload')
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
        };
    }

    componentDidMount(): void {
        this.animation.play();

    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <StatusBar
                    hidden={false}
                    translucent={false}
                    backgroundColor={BLUESLIGHT}
                />
                <LinearGradient
                    colors={[BLUEDARK, BLUESLIGHT]}
                    start={{x: 0.0, y: 0.8}}
                    end={{x: 1.0, y: 1.0}}
                    style={{
                        flex: 1,
                        backgroundColor: BLUESLIGHT,
                        margin: 5,
                        elevation: 5,
                        borderRadius: 5,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TEXTLLGWHITE>Payment Successful</TEXTLLGWHITE>
                        <TEXTLLlG>₹ 1500 *</TEXTLLlG>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={['#ffc200', '#c89400']}
                    start={{x: 0.0, y: 0.8}}
                    end={{x: 1.0, y: 1.0}}
                    style={{
                        flex: 1.5,
                        backgroundColor: YELLOW,
                        margin: 5,
                        elevation: 5,
                        borderRadius: 5,
                    }}>
                    <View
                        style={{
                            flex: 1.5,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            padding: 10,
                        }}>
                        <TEXTLLGWHITEP>Whats next</TEXTLLGWHITEP>
                        <TEXTNL>* Upload few Address Proof</TEXTNL>
                        <TEXTNL>* Upload few Identify Proof</TEXTNL>
                        <TEXTNL>* Upload Selfie</TEXTNL>
                        <TEXTNL>* Start taking Live Classes </TEXTNL>

                    </View>
                </LinearGradient>



                <View
                    style={{
                        flex: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <LottieView
                        style={{
                            height: 500,
                            width: 500,
                        }}
                        loop={false}
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../Assets/lottie/successgreen')}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                    <ButtonCustom
                        onPre={() => this.CreateOrder()}
                        // loading={this.state.loading}
                        title={'Continue Doccument Upload'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
