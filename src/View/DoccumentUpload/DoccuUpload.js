import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    StatusBar,
    ScrollView, TouchableOpacity,
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

        };
    }

    componentDidMount(): void {
        // this.animation.play();
        this.animation0.play(30, 30);
        this.animation.play(30, 30);
        this.animationt.play(30, 30);

    }

    UploadAddressProof = async ()=> {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
            includeBase64:true
        }).then(image => {
            this.setState({
                loop: true,

            })
            this.animation.play(30, 60);
            console.log(image);
        });

    }

    UploadImage = async ()=> {
        let options = {
            width: 300,
            height: 400,
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
            console.log(PushToserver);
            if (PushToserver.status === true){

                this.setState({
                    loop0: false,

                });
                this.animation0.play(60, 100);
            }


        }






    }

    UploadIDProof = async ()=> {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            mediaType: 'photo',
            includeBase64:true
        }).then(image => {
            this.setState({
                loopt: true,
            });
            this.animationt.play(30, 60);
            console.log(image);
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




                <View
                    style={{
                        flex: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:WHITE,
                        margin:15
                    }}>
                    <TouchableOpacity
                        onPress={() => this.UploadImage()}
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
                    <ButtonCustom
                        onPre={() => this.CreateOrder()}
                        // loading={this.state.loading}
                        title={'Confirm Upload'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

