import React, {Component} from 'react';
import {
    Alert,
    View,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView, StatusBar, ActivityIndicator,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as yup from 'yup';
import {Formik} from 'formik';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import ButtonOutline from '../../Component/ButtonOutline';
import TextPrimary from '../../Component/TextPrimary';
import {inject, observer} from 'mobx-react';
import ButtonText from '../../Component/ButtonText';
import ButtonCustomWithiconColor from '../../Component/ButtonCustomWithiconColor';
import QRCode from 'react-native-qrcode-svg';
import {TEXTLLGWHITE, TEXTNLBLACKD} from '../../Style/TextStyle';
import {BLUESLIGHT, WHITE} from '../../Config/theme';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject('Auth','User')
@observer
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }

    componentDidMount(): void {
        console.log(this.props.User.device_uuid)
    }

    OnLogin = async (values) => {
      this.setState({
          loading:true
      });

      if (await this.props.Auth.CheckOnline() === true && await this.props.Auth.Login(values) === true){


          let userdata = await this.props.User.getUserDetails(this.props.Auth.access_token);
          console.log(userdata);
          if (userdata === true){
             // this.props.Auth.logged =  true;

              let Config =  await this.props.Auth.GetConfig();
              let _TOKEN =  await this.props.Auth.GetToken();
              if (await this.props.Auth.CheckOnline() === true &&
                  _TOKEN !== null
                  && await this.props.User.getUserDetails(_TOKEN)  === true){

                  let posttoken = await this.props.User.ADD_NOTIFY_DEVICES(_TOKEN,this.props.User.device_uuid);
                  let checkroute = await this.props.User.CheckRoute();
                //  console.log(posttoken)
                  this.props.Auth.logged =  true;

              } else {
                  this.props.Auth.logged =  false;
              }



              this.setState({
                  loading:false
              });
          }

      } else {
          Alert.alert(
              "Invalid Login",
              this.props.Auth.langfile.words.cfyupic,
              [
                  {
                      text: this.props.Auth.langfile.words.raa,
                      onPress: () => this.props.navigation.navigate('Register'),
                      style: "cancel"
                  },
                  { text: this.props.Auth.langfile.words.ta, onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
          );
      }
      this.setState({
          loading:false
      });
  };

  inputs = {};
  // function to focus the field
  focusTheField = id => {
    this.inputs[id].focus();
  };

  render() {
    return (
      <ImageBackground
        style={{
          width: WIDTH,
          height: HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../Assets/Images/loginbg.png')}>
        <View
          style={{
            flex: 1,
          }}>
            <StatusBar
                hidden={false}
                translucent={true}
                backgroundColor={'rgba(255,255,255,0.0)'}
            />
            <TouchableOpacity
                onPress={() => this.props.Auth.langpopup = true}
                style={{
                position:'absolute',
                padding:5,
                marginTop:30,
                right:10,
                borderColor:WHITE,
                borderWidth:1,
                borderRadius:7
            }}>
                <Icon name={'language'} type={'entypo'} color={WHITE}/>
                <TEXTLLGWHITE> Language</TEXTLLGWHITE>
            </TouchableOpacity>
          <View
            size={50}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              style={{
                width: 120,
                height: 120,
                backgroundColor: 'rgba(255,255,255,0.29)',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../Assets/Images/logobg.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1.5,
            }}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                username: '',
                password: '',
              }}
              onSubmit={values => this.OnLogin(values)}
              validationSchema={yup.object().shape({
                username: yup
                  .string()
                  .min(6)
                  .required(),
                password: yup
                  .string()
                  .min(6)
                  .required(),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <KeyboardAvoidingView
                  keyboardVerticalOffset={100} // adjust the value here if you need more padding
                  style={{flex: 1.5}}
                  behavior="padding">
                  <View>
                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('password');
                      }}
                      value={values.username}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'account-arrow-right'}
                      placeholder={this.props.Auth.langfile.words.un}
                      onChangeText={handleChange('username')}
                      onBlur={() => setFieldTouched('username')}
                      autoCorrect={false}
                      keyboardType={'email-address'}
                      textContentType={'username'}
                      status={
                        touched.username && errors.username
                          ? 'danger'
                          : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.username && errors.username
                          ? errors.username
                          : ''
                      }
                    />
                  </View>
                  <View>
                    <InputCustom
                      InputRef={input => {
                        this.inputs.password = input;
                      }}
                      textContentType={'password'}
                      autoCompleteType={'password'}
                      keyboardType={'default'}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      placeholder={this.props.Auth.langfile.words.pw}
                      leftIcon={'onepassword'}
                      returnKeyType={'go'}
                      autoCorrect={false}
                      value={values.password}
                      blurOnSubmit={false}
                      secureTextEntry={true}
                      status={
                        touched.password && errors.password
                          ? 'danger'
                          : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.password && errors.password
                          ? errors.password
                          : ''
                      }
                      // autoCompleteType={'tel'}
                    />
                  </View>

                  <View>
                    <ButtonCustom
                      title={this.props.Auth.langfile.words.login}
                      loading={this.state.loading}
                      onPre={handleSubmit}
                    />


                  </View>
                </KeyboardAvoidingView>
              )}
            </Formik>

            <View
              style={{
                flex: 1,
              }}>
              <TextPrimary value={this.props.Auth.langfile.words.dhaa} />
              <ButtonOutline onPress={() => this.props.navigation.navigate('Register')} title={this.props.Auth.langfile.words.rgd} />
                <ButtonText onPress={() => this.props.navigation.navigate('ForgotPassword')} title={this.props.Auth.langfile.words.fp}/>
            </View>



              <Modal
                  isVisible={this.props.Auth.langpopup}
                  animationIn={'slideInUp'}
                  useNativeDriver={true}
                  animationInTiming={700}
                  animationOutTiming={700}
                  backdropTransitionOutTiming={1000}
                  onSwipeComplete={() => this.props.Auth.langpopup = false}
                  swipeDirection="down"
                  style={{margin: 0}}
                  onBackButtonPress={() =>
                      this.props.Auth.langpopup = false
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
                          height: HEIGHT / 3,
                          borderTopRightRadius: 22,
                          borderTopLeftRadius: 22,
                      }}>
                          <View style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                          }}>
                              <TEXTNLBLACKD>Select Language</TEXTNLBLACKD>
                              <ButtonCustomWithiconColor title={'English'}
                                                         iconname={'language'}
                                                         type={'entypo'}
                                                         color1={'#ff8216'}
                                                         onPre={()  => this.props.Auth.ChangeLang('en-in')}
                                                         color2={'#ff9500'}
                                                         loading={this.state.loading}
                                                         color3={'#ffbe00'}/>

                              <ButtonCustomWithiconColor title={'Hindi'}
                                                         onPre={() => this.props.Auth.ChangeLang('hi')}
                                                         iconname={'language'}
                                                         type={'entypo'}
                                                         color1={'#3accff'}
                                                         color2={'#69b1ff'}
                                                         color3={'#87acff'}/>

                                                         <ButtonCustomWithiconColor title={'Nepali'}
                                                         onPre={() => this.props.Auth.ChangeLang('ne')}
                                                         iconname={'language'}
                                                         type={'entypo'}
                                                         color1={'#4affaf'}
                                                         color2={'#44eea5'}
                                                         color3={'#3dc885'}/>
                          </View>



                  </View>
              </Modal>




          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
