import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import {
    BLUEDARK,
    BLUESLIGHT,
    LIGHTERBLACK,
    WHITE,
    YELLOW,
} from '../../Config/theme';
import { TEXTNLBLACKD,
} from '../../Style/TextStyle';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../../Component/ButtonCustom';
import {inject, observer} from 'mobx-react';
import LottieView from "lottie-react-native";
import ImagePicker from 'react-native-image-crop-picker';
import ButtonCustomDisabled from '../../Component/ButtonCustomDisabled';

@inject('Auth','User','Payment')
@observer
export default class DoccuUpload extends Component {
    static navigationOptions = {
        title: 'Verify Documents',
        headerStyle: {
            backgroundColor: BLUESLIGHT,
        },
        headerTintColor: BLUESLIGHT,
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'MontserratMedium',
            color: WHITE,
        },
    };



    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            loop0: false,
            loop: false,
            loopt: false,
            up: false,
            up0: false,
            upt: false,

        };
    }

    componentDidMount(): void {
        // this.animation.play();
        this.animation0.play(30, 30);
        this.animation.play(30, 30);
        this.animationt.play(30, 30);

    }


    UploadSelfile = async () => {
        let options = {
            width: 1024,
            height: 1440,
            cropping: true,
            mediaType: 'photo',
            includeBase64:true
        }
        let _TOKEN =  await this.props.Auth.GetToken();
        let ImageUploadAvatar = await ImagePicker.openCamera(options);
        if (ImageUploadAvatar !== null){
            this.setState({
                loop0: true,

            });
            this.animation0.play(30, 60);

            let PushToserver = await this.props.Payment.AvatarUpload(_TOKEN,ImageUploadAvatar.data);
            console.log('PushToserver');
            console.log(PushToserver);
            if (PushToserver.status === true){

                this.setState({
                    loop0: false,
                    up0: true,

                });
                this.animation0.play(60, 100);
            }  else {
                this.setState({
                    loop0: false,

                });
                this.animation0.play(30, 30);
                Alert.alert(
                    "Error in Upload ",
                    "Check for your Internet Connection",
                    [
                        { text: "Try Again", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }


        }
    }



    UploadAddressProof = async ()=> {
        let options = {
            width: 1024,
            height: 1440,
            cropping: true,
            mediaType: 'photo',
            includeBase64:true
        }
        let _TOKEN =  await this.props.Auth.GetToken();
        let ImageUploadAvatar = await ImagePicker.openPicker(options);
        if (ImageUploadAvatar !== null){
            this.setState({
                loop: true,

            });
            this.animation.play(30, 60);

            let PushToserver = await this.props.Payment.AddressUpload(_TOKEN,ImageUploadAvatar.data);
            console.log('PushToserver');
            console.log(PushToserver);
            if (PushToserver.status === true){

                this.setState({
                    loop: false,
                    up: true,

                });
                this.animation.play(60, 100);
            }  else {
                this.setState({
                    loop: false,

                });
                this.animation.play(30, 30);
                Alert.alert(
                    "Error in Upload ",
                    "Check for your Internet Connection",
                    [
                        { text: "Try Again", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }


        }






    }

    UploadComplete = async ()  => {

        this.props.User.route = 3
    }

    UploadIDProof = async ()=> {
        let options = {
            width: 1024,
            height: 1440,
            cropping: true,
            mediaType: 'photo',
            includeBase64:true
        }
        let _TOKEN =  await this.props.Auth.GetToken();
        let ImageUploadAvatar = await ImagePicker.openPicker(options);
        if (ImageUploadAvatar !== null){
            this.setState({
                loopt: true,

            });
            this.animationt.play(30, 60);

            let PushToserver = await this.props.Payment.IdentityUpload(_TOKEN,ImageUploadAvatar.data);
            console.log(PushToserver)
            if (PushToserver.status === true){

                this.setState({
                    loopt: false,
                    upt: true,

                });
                this.animationt.play(60, 100);
            } else {
                this.setState({
                    loopt: false,

                });
                this.animationt.play(30, 30);
                Alert.alert(
                    "Error in Upload ",
                    "Check for your Internet Connection",
                    [
                        { text: "Try Again", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }


        }


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




                <View
                    style={{
                        flex: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:WHITE,
                        margin:15
                    }}>
                    <TouchableOpacity
                        onPress={() => this.UploadSelfile()}
                        style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <LottieView
                        style={{
                            height: 150,
                            width: 150,
                        }}
                        loop={this.state.loop0}
                        ref={animation => {
                            this.animation0 = animation;
                        }}
                        source={require('../../Assets/lottie/docupload')}
                    />
                    <TEXTNLBLACKD>Upload Selfie</TEXTNLBLACKD>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flex: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:WHITE,
                        margin:15
                    }}>
                    <TouchableOpacity
                        onPress={() => this.UploadAddressProof()}
                        style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <LottieView
                        style={{
                            height: 150,
                            width: 150,
                        }}
                        loop={this.state.loop}
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../Assets/lottie/docupload')}
                    />
                    <TEXTNLBLACKD>Upload Address Proof</TEXTNLBLACKD>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flex: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:WHITE,
                        margin:15
                    }}>
                    <TouchableOpacity
                        onPress={() => this.UploadIDProof()}
                        style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <LottieView
                            style={{
                                height: 150,
                                width: 150,
                            }}
                            loop={this.state.loopt}
                            ref={animation => {
                                this.animationt = animation;
                            }}
                            source={require('../../Assets/lottie/docupload')}
                        />
                        <TEXTNLBLACKD>Upload Identify Proof</TEXTNLBLACKD>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                    {
                        this.state.up === true && this.state.up0 === true && this.state.upt === true  ?(
                            <ButtonCustom
                                onPre={() => this.UploadComplete()}
                                // loading={this.state.loading}
                                title={'Confirm Upload'}
                            />
                        ) : (
                            <ButtonCustomDisabled
                                // loading={this.state.loading}
                                title={'Upload Pending'}
                            />
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

