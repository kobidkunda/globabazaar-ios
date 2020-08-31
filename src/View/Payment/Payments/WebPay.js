import React, {Component} from 'react';
import {StyleSheet, Text, ToastAndroid, Vibration, BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {inject, observer} from 'mobx-react';
import PaymentLoading from './PaymentLoading';
import {BLUESLIGHT, WHITE} from '../../../Config/theme';
@inject('Auth', 'User', 'Payment')
@observer
export default class WebPay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paymentid: null,
            paymentstatus: null,
            loading: null,
            confirmtitle : null,
            paymentmedium : null,
            queposition : 0,
            time : null,
            shipping: null,
            order: null,
            url:null
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }


    static navigationOptions = {
        title: 'Payment Confirm',
        headerStyle: {
            backgroundColor: BLUESLIGHT,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Montserrat-Bold',
            color: WHITE,
        },
    };

    async componentDidMount() {
        const paymentid = this.props.route.params;
        console.log(paymentid);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);



        this.setState({
            paymentid: paymentid,

        })


    }



    componentWillUnmount() {
        // This is the Last method in the activity lifecycle
        // Removing Event Listener for the BackPress
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    async handleBackButtonClick() {
       this.props.navigation.goBack();
    }

    render() {
        if (this.state.loading === 1){
            return (
                <PaymentLoading navigation={this.props.navigation}/>
            )
        } else {
            return <WebView
                javaScriptEnabled={true}
                thirdPartyCookiesEnabled={true}
                cacheEnabled={false}
                allowsLinkPreview={true}
                useWebKit={true}
                startInLoadingState={true}
                renderLoading={() => <PaymentLoading />}
                onNavigationStateChange={this.handleWebViewNavigationStateChange}
                source={{uri: this.props.Payment.short_url}} />;
        }

    }

    handleWebViewNavigationStateChange = async newNavState => {
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        const { url } = newNavState;
        if (!url) return;

        // handle certain doctypes


        // one way to handle errors is via query string
        if (url.includes('/user/confirmPayment/')) {

            this.setState({


                loading:1
            });
            let _TOKEN =  await this.props.Auth.GetToken();
          let Userstatus =   await this.props.User.getUserDetails(_TOKEN);

            let checkroute = await this.props.User.CheckRoute();

            if (Userstatus.is_premium === 1){
                console.log('Userstatus');
                console.log(Userstatus);
                let checkroute = await this.props.User.CheckRoute();

            }



            /*let Checkstatus = await this.props.Cart.CheckpaymentStatus(this.state.paymentid);

            // console.log(GET_AUTH_TOKEN);

            if (Checkstatus.create_b_v_order_to_payments.status === "SUCCESS"){
                // alert('success')

                this.setState({
                    loading: 2,
                    confirmtitle:'Order & Payment Successful',
                    paymentid: Checkstatus.order_secure_id,
                    order: Checkstatus,
                    paymentstatus: Checkstatus.create_b_v_order_to_payments.status
                })
                })Checkstatus

            } else {
                this.setState({
                    paymentid: Checkstatus.order_secure_id,
                    order: Checkstatus,
                    loading: 2,
                    confirmtitle:'Order Successful',
                    paymentstatus: Checkstatus.create_b_v_order_to_payments.status
                })
                ToastAndroid.showWithGravityAndOffset(
                    'Your Payment is unsuccessful Please try again from my orders',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                Vibration.vibrate(70);
                this.props.navigation.goBack();
            }*/



            //  this.props.navigation.navigate('DashboardPage');
        }

        // redirect somewhere else

    };
}


