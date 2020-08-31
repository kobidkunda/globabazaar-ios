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
import RNIap, {
    purchaseErrorListener,
    purchaseUpdatedListener,
    type ProductPurchase,
    type PurchaseError, InAppPurchase, SubscriptionPurchase
} from 'react-native-iap';




@inject('Auth','User','Payment')
@observer
export default class ConfirmPayment extends Component {


    purchaseUpdateSubscription = null
    purchaseErrorSubscription = null

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
            products: null
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

        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }
        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }
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
        const itemSkus = Platform.select({
            ios: [
                '1000'
            ],
            android: [
                'com.globalbazaar.premium001'
            ]
        });

        try {
            const products: Product[] = await RNIap.getProducts(itemSkus);


            this.setState({
                products: products[0]
            })
            console.log(products)
        } catch(err) {
            console.warn(err); // standardized err.code and err.message available
        }

        try {
              await RNIap.requestPurchase('1000', false);
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }





    componentDidMount(): void {
        this.animation.play();

        this.purchaseUpdateSubscription = purchaseUpdatedListener((purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase ) => {
            console.log('purchaseUpdatedListener', purchase);
            const receipt = purchase.transactionReceipt;
            console.log(purchase);
            if (receipt) {
                console.log(receipt)
                 RNIap.finishTransactionIOS(purchase.transactionId);
                /*'yourAPI'.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
                    .then( async (deliveryResult) => {
                        if (isSuccess(deliveryResult)) {
                            // Tell the store that you have delivered what has been paid for.
                            // Failure to do this will result in the purchase being refunded on Android and
                            // the purchase event will reappear on every relaunch of the app until you succeed
                            // in doing the below. It will also be impossible for the user to purchase consumables
                            // again until you do this.
                            if (Platform.OS === 'ios') {
                                await RNIap.finishTransactionIOS(purchase.transactionId);
                            } else if (Platform.OS === 'android') {
                                // If consumable (can be purchased again)
                                await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
                                // If not consumable
                                await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
                            }

                            // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
                            // If consumable (can be purchased again)
                            await RNIap.finishTransaction(purchase, true);
                            // If not consumable
                            await RNIap.finishTransaction(purchase, false);
                        } else {
                            // Retry / conclude the purchase is fraudulent, etc...
                        }
                    });*/
            }
        });

        this.purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
            console.warn('purchaseErrorListener', error);
        });

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

                               <ButtonCustomWithiconColor title={'Google Pay'}
                                                          onPre={() => this.googlepay()}
                                                          iconname={'apple'}
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

