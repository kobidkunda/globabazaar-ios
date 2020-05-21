import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as yup from 'yup';
import {Formik} from 'formik';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import ButtonOutline from '../../Component/ButtonOutline';
import TextPrimary from '../../Component/TextPrimary';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
    };
  }
  OnLogin = async values => {
    console.log(values);
    this.setState({
      editable: false,
      otpsent: true,
      loading: false,
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
                <KeyboardAvoidingView
                  keyboardVerticalOffset={100} // adjust the value here if you need more padding
                  style={{flex: 1.5}}
                  behavior="padding">
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
                  </View>
                  {this.state.otpsent === true ? (
                    <View>
                      <InputCustom
                        InputRef={input => {
                          this.inputs.otp = input;
                        }}
                        value={values.otp}
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                        leftIcon={'cellphone-android'}
                        placeholder="otp"
                        onChangeText={handleChange('phone')}
                        onBlur={() => setFieldTouched('otp')}
                        autoCorrect={false}
                        secureTextEntry={true}
                        keyboardType={'onepassword'}
                        textContentType={'phone'}
                        editable={this.state.editable}
                        status={
                          touched.otp && errors.otp ? 'danger' : 'primary'
                        }
                        shake={true}
                        errorMessage={
                          touched.otp && errors.otp ? errors.otp : ''
                        }
                      />
                    </View>
                  ) : null}

                  <View>
                    {this.state.otpsent === true ? (
                      <ButtonCustom
                        title={'Validate OTP'}
                        loading={this.state.loading}
                        onPre={handleSubmit}
                      />
                    ) : (
                      <ButtonCustom
                        title={'Send OTP'}
                        loading={this.state.loading}
                        onPre={handleSubmit}
                      />
                    )}
                  </View>
                </KeyboardAvoidingView>
              )}
            </Formik>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
