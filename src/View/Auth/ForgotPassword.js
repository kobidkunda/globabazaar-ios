import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView, KeyboardStatic as Keyboard,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import RNOtpVerify from 'react-native-otp-verify';
import {inject, observer} from 'mobx-react';
import {TEXTLLGWHITE} from '../../Style/TextStyle';
import ButtonOutline from '../../Component/ButtonOutline';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject('Auth')
@observer
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
        otp: null,
        phone: null
    };
  }
  OnLogin = async values => {

      let otpleft = this.props.Auth.otpretry;

      if (otpleft > 0 ){
          this.setState({
              loading: true,
              phone: values.phone
          });
          this.props.Auth.otpretry =    Number(this.props.Auth.otpretry) - 1;
          let hhaasshh = await RNOtpVerify.getHash();



          let kkkk = await this.props.Auth.SendOtpmsg(hhaasshh, this.state.phone);
          console.log(hhaasshh);
          console.log(values.phone);
          console.log(kkkk);


          this.setState({
              editable: false,
              otpsent: true,
              loading: false,
          });
      } else {
          alert('Maximum Retry reached Try in 1 hour')
      }



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
            <KeyboardAvoidingView
                keyboardVerticalOffset={100} // adjust the value here if you need more padding
                style={{flex: 1.5}}
                behavior="padding">
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

              {this.state.otpsent === false ? (
            <Formik
              enableReinitialize={true}
              initialValues={{
                phone: '',
              }}
              onSubmit={values => this.OnLogin(values)}
              validationSchema={yup.object().shape({
                phone: yup
                  .string()
                  .min(10, 'Use Valid Indian Mobile Number without 0 or +91')
                  .max(10, 'Use Valid Indian Mobile Number without 0 or +91')
                  .matches(
                    /^(\+91|\+91\-|0)?[6789]\d{9}$/,
                    'Phone number is not valid',
                  )
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

                  <View>
                    <InputCustom
                      InputRef={input => {
                        this.inputs.phone = input;
                      }}
                      value={values.phone}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'cellphone-android'}
                      placeholder="Phone"
                      onChangeText={handleChange('phone')}
                      onBlur={() => setFieldTouched('phone')}
                      autoCorrect={false}
                      keyboardType={'phone-pad'}
                      textContentType={'phone'}
                      editable={this.state.editable}
                      status={
                        touched.phone && errors.phone ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.phone && errors.phone ? errors.phone : ''
                      }
                    />

                    <View>
                        <ButtonCustom
                            title={'Send OTP'}
                            loading={this.state.loading}
                            onPre={handleSubmit}
                        />
                    </View>


                  </View>




              )}
            </Formik>

                  ) : null }



              {this.state.otpsent === true ? (


                          <View>
                  <View>
                      <InputCustom
                          InputRef={input => {
                              this.inputs.otp = input;
                          }}
                          value={this.state.otp}
                          blurOnSubmit={false}
                          returnKeyType={'next'}
                          leftIcon={'cellphone-android'}
                          placeholder="otp"
                          onChangeText={(value) => this.setState({otp: value})}
                          autoCorrect={false}
                          secureTextEntry={true}
                          keyboardType={'phone-pad'}
                          textContentType={'phone'}
                      />

                  </View>
                              <ButtonCustom
                                  title={'Send OTP'}
                                  loading={this.state.loading}
                                 // onPre={handleSubmit}
                              />

                          </View>


              ) : null}




              <View style={{
                  padding:10,
                  alignItems:'center'
              }}>
                  <ButtonOutline onPress={() => this.OnLogin} title={'OTP Retry left ' + this.props.Auth.otpretry}/>

              </View>




          </View>
                  </KeyboardAvoidingView>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
