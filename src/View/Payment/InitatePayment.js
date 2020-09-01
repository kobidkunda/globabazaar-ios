import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    Platform, ActivityIndicator, Alert,
} from 'react-native';
import {
    BLUEDARK,
    BLUESLIGHT, HEIGHT,
    LIGHTERBLACK,
    WHITE, WIDTH,
    YELLOW,
} from '../../Config/theme';
import {
    TEXTLG,
    TEXTLLG,
    TEXTLLGWHITE,
    TEXTLLGWHITEP,
    TEXTLLlG,
    TEXTNL, TEXTNLBLACKD,
} from '../../Style/TextStyle';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../../Component/ButtonCustom';
import {inject, observer} from 'mobx-react';
import QRCode from 'react-native-qrcode-svg';
import LottieView from "lottie-react-native";
import Modal from 'react-native-modal';
import ButtonCustomWithiconColor from '../../Component/ButtonCustomWithiconColor';
import ButtonOutline from "../../Component/ButtonOutline";
import Purchases from 'react-native-purchases';





@inject('Auth','User','Payment')
@observer
export default class ConfirmPayment extends Component {


    static navigationOptions = {
        title: 'Payment Confirm',
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





    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            model:false,
            paymentbtn: true,
            offlinepayment: false,
            modelheight: 4,
            products: null,
            loadingapple:false
        };
    }

    CreateOrderOnline = async () => {
       this.setState({
            loading: true
        });
        let _TOKEN =  await this.props.Auth.GetToken();
        let Create_order = await this.props.Payment.CreatePayment(_TOKEN);
        console.log(_TOKEN)
        console.log(Create_order);

        if (Create_order.link.status === 'issued'){
            this.setState({
                loading: false,
                model:false
            });
            this.props.navigation.navigate('WebPay',{
                id : Create_order.link.id,
                order_id : Create_order.link.order_id,
                short_url : Create_order.link.short_url,
                status : Create_order.link.status,
            });

        } else {
            this.setState({
                loading: false,

            });
            Alert.alert(
                "Error Occurred",
                "Check for your Data or your Internet Connection. If Problem exists contact Support",
                [
                    { text: "Try Again", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }



     // this.props.navigation.navigate('ConfirmPayment')
    }

    componentWillUnmount() {
        clearTimeout(this.timer);

    }
    CreateOrderCash = async () => {
        this.setState({
            offlinepayment: true,
            paymentbtn: false,
            modelheight :2
        });

        this.timer = setInterval(()=> this.Checkupdatesonofline(), 3000)
        //this.props.navigation.navigate('WebPay')

        // this.props.navigation.navigate('ConfirmPayment')
    };

    Checkupdatesonofline = async () => {
        let _TOKEN =  await this.props.Auth.GetToken();
        let checkroute = await this.props.User.getUserDetailsRecheck(_TOKEN);

        let checkroutet = await this.props.User.CheckRoute();


    }

    googlepay = async () => {
        this.setState({
            loadingapple:true
        })

        try {
            const offerings = await Purchases.getOfferings();
            console.log(offerings)
            if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {

            }
        } catch (e) {

        }



// Note: if you are using purchaseProduct to purchase Android In-app products, an optional third parameter needs to be provided when calling purchaseProduct. You can use the package system to avoid this

        try {
         let kkk =  await Purchases.purchaseProduct("1000", null, Purchases.PURCHASE_TYPE.INAPP);

         console.log(kkk)

            this.setState({
                loadingapple:false
            })

            Alert.alert(
                "Your Purchase Successful",
                "Thanks for making payment. You can start taking class now",
                [
                    { text: "Proceed to Class", onPress: () => this.props.User.route = 3 }
                ],
                { cancelable: false }
            );

        } catch (e) {
            console.log(e);

            this.setState({
                loadingapple:false
            })

            Alert.alert(
                "Error Occurred",
                "Your Purchase is unsuccessful",
                [
                    { text: "Try Again", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }





    }





   async componentDidMount(): void {
        this.animation.play();

       await Purchases.setDebugLogsEnabled(true);
       Purchases.setup("dMbseQznjrCwDtRuogOfBYYOFQYjLIVS");


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
                        flex: 1.5,
                        backgroundColor: BLUESLIGHT,
                        margin: 5,
                        elevation: 5,
                        borderRadius: 5,
                        padding:10
                    }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TEXTLLGWHITE>Enrollment Fees</TEXTLLGWHITE>
                        <TEXTLLlG>₹ 1500 *</TEXTLLlG>
                        <TEXTNL>(Inc GST)</TEXTNL>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={['#ffc200', '#c89400']}
                    start={{x: 0.0, y: 0.8}}
                    end={{x: 1.0, y: 1.0}}
                    style={{
                        flex: 2.5,
                        backgroundColor: YELLOW,
                        margin: 5,
                        elevation: 5,
                        borderRadius: 5,
                        padding:10
                    }}>
                    <View
                        style={{
                            flex: 1.5,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            padding: 10,
                        }}>
                        <TEXTLLGWHITEP>Admission For 1 Week Training</TEXTLLGWHITEP>
                        <TEXTNL>* Online & Of-line training for 1 Week</TEXTNL>
                        <TEXTNL>* Personal Development Class</TEXTNL>
                        <TEXTNL>* Training by Professionals</TEXTNL>
                        <TEXTNL>* Join Emporium </TEXTNL>
                        <TEXTNL>* Become Self Dependent </TEXTNL>
                        <TEXTNL>* Online Live Class </TEXTNL>
                    </View>
                </LinearGradient>



                <View
                    style={{
                        flex: 3.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <LottieView
                        style={{
                            height: 250,
                            width: 259,
                        }}
                        loop={false}
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../Assets/lottie/online-class')}
                    />
                </View>

                <Modal
                    isVisible={this.state.model}
                    animationIn={'slideInUp'}
                    useNativeDriver={true}
                    animationInTiming={700}
                    animationOutTiming={700}
                    backdropTransitionOutTiming={1000}
                    onSwipeComplete={() => this.setState({model: false})}
                    swipeDirection="down"
                    style={{margin: 0}}
                    onBackButtonPress={() =>
                        this.setState({
                            model: false,
                        })
                    }>
                    <View
                        style={{
                            position: 'absolute',
                            flex:1,
                            bottom: 0,
                            width: WIDTH,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:'#ffffff',
                            height: HEIGHT / this.state.modelheight,
                            borderTopRightRadius: 22,
                            borderTopLeftRadius: 22,
                        }}>

                        { this.state.paymentbtn === true ? (
                           <View style={{
                               justifyContent: 'center',
                               alignItems: 'center',
                           }}>
                               <ButtonCustomWithiconColor title={'Online Payment'}
                                                          iconname={'credit-card-plus'}
                                                          type={'material-community'}
                                                          color1={'#ff8216'}
                                                          onPre={()  => this.CreateOrderOnline()}
                                                          color2={'#ff9500'}
                                                          loading={this.state.loading}
                                                          color3={'#ffbe00'}/>

                               <ButtonCustomWithiconColor title={'Cash Payment'}
                                                          onPre={() => this.CreateOrderCash()}
                                                          iconname={'cash-100'}
                                                          type={'material-community'}
                                                          color1={'#3accff'}
                                                          color2={'#69b1ff'}
                                                          color3={'#87acff'}/>

                               <ButtonCustomWithiconColor title={'Apple Pay'}
                                                          onPre={() => this.googlepay()}
                                                          iconname={'apple'}
                                                          loading={this.state.loadingapple}
                                                          type={'material-community'}
                                                          color1={'#000000'}
                                                          color2={'#000000'}
                                                          color3={'#000000'}/>
                           </View>
                        ) : null
                        }

                        { this.state.offlinepayment === true ? (
                           <View style={{
                               flex:1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               padding:20
                           }}>
                               <View style={{
                                   flex: 2.6,
                                   alignItems: 'center',
                                   justifyContent: 'center',
                               }}>
                               <QRCode
                                   size={150}
                                   value={this.props.User.uuid}
                               />

                               <TEXTNLBLACKD >Scan at Terminal</TEXTNLBLACKD>

                               </View>

                               <View style={{
                                   flex: 1,
                                   alignItems: 'center',
                                   justifyContent: 'flex-end',
                               }}>
                                   <ActivityIndicator size="large" color={BLUESLIGHT} />


                                   <ButtonCustomWithiconColor title={'Waiting for Payment'}
                                                              iconname={'cash-100'}
                                                              loading={this.state.loading}
                                                              type={'material-community'}
                                                              color1={'#3accff'}
                                                              color2={'#69b1ff'}
                                                              color3={'#87acff'}/>

                               </View>


                           </View>
                        ) : null
                        }

                    </View>
                </Modal>

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                    <ButtonCustom
                        onPre={() => this.setState({model: true})}

                        title={'Confirm Purchase'}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                    <ButtonOutline
                        onPress={() =>
                         //   this.props.User.is_premium  === true

                            this.props.User.route = 3}

                        title={'Skip To Free Videos'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modelContainer: {
        backgroundColor: '#ffffff',
        bottom:0,
        height:200,
        width:WIDTH-10,
        //marginLeft:5,
       // marginRight:5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

