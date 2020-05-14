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
  ScrollView,
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

export default class Register extends Component {
  OnLogin = async values => {
    console.log(values);
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
        <ScrollView
          style={{
            flex: 1,
            paddingTop: 50,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              paddingBottom: 50,
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

          <KeyboardAvoidingView
            // keyboardVerticalOffset={0} // adjust the value here if you need more padding
            // style={{flex: 1.5}}
            behavior="padding">
            <View
              style={{
                flex: 1.5,
                paddingBottom: 90,
              }}>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fname: '',
                  lname: '',
                  email: '',
                  phone: '',
                  street: '',
                  city: '',
                  state: '',
                  pincode: '',
                  password: '',
                }}
                onSubmit={values => this.OnLogin(values)}
                validationSchema={yup.object().shape({
                  fname: yup
                    .string()
                    .min(2, 'First name should be of 3 Characters or more')
                    .required('First name is required'),
                  lname: yup
                    .string()
                    .min(2, 'Last name should be of 3 Characters or more')
                    .required('First name is required'),
                  email: yup
                    .string()
                    .email('Use Valid Email')
                    .required(),
                  phone: yup
                    .string()
                    .min(10, 'Use Valid Indian Mobile Number without 0 or +91')
                    .max(10, 'Use Valid Indian Mobile Number without 0 or +91')
                    .matches(
                      /^(\+91|\+91\-|0)?[6789]\d{9}$/,
                      'Phone number is not valid',
                    )
                    .required(),
                  street: yup
                    .string()
                    .min(5)
                    .required(),
                  city: yup
                    .string()
                    .min(4)
                    .required(),
                  state: yup
                    .string()
                    .min(2)
                    .required(),

                  pincode: yup
                    .string()
                    .min(6)
                    .max(6)
                    .matches(/\d{3}[\ ]?\d{3}/, 'Pincode is not valid')
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
                  <View
                  //  keyboardVerticalOffset={50} // adjust the value here if you need more padding
                  // style={{flex: 1.5}}
                  //  behavior="padding"
                  >
                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('lname');
                      }}
                      value={values.fname}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'account-arrow-right'}
                      placeholder="First Name"
                      onChangeText={handleChange('fname')}
                      onBlur={() => setFieldTouched('fname')}
                      autoCorrect={false}
                      keyboardType={'default'}
                      textContentType={'fname'}
                      status={
                        touched.fname && errors.fname ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.fname && errors.fname ? errors.fname : ''
                      }
                    />

                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('email');
                      }}
                      InputRef={input => {
                        this.inputs.lname = input;
                      }}
                      value={values.lname}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'account-arrow-left'}
                      placeholder="Last Name"
                      onChangeText={handleChange('lname')}
                      onBlur={() => setFieldTouched('lname')}
                      autoCorrect={false}
                      keyboardType={'default'}
                      textContentType={'lname'}
                      status={
                        touched.lname && errors.lname ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.lname && errors.lname ? errors.lname : ''
                      }
                    />

                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('phone');
                      }}
                      InputRef={input => {
                        this.inputs.email = input;
                      }}
                      value={values.email}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'email-open'}
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      autoCorrect={false}
                      keyboardType={'email-address'}
                      textContentType={'email'}
                      status={
                        touched.email && errors.email ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.email && errors.email ? errors.email : ''
                      }
                    />

                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('street');
                      }}
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
                      status={
                        touched.phone && errors.phone ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.phone && errors.phone ? errors.phone : ''
                      }
                    />

                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('city');
                      }}
                      InputRef={input => {
                        this.inputs.street = input;
                      }}
                      value={values.street}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'map-marker-minus'}
                      placeholder="Street"
                      onChangeText={handleChange('street')}
                      onBlur={() => setFieldTouched('street')}
                      autoCorrect={false}
                      keyboardType={'default'}
                      textContentType={'street'}
                      status={
                        touched.street && errors.street ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.street && errors.street ? errors.street : ''
                      }
                    />

                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('state');
                      }}
                      InputRef={input => {
                        this.inputs.city = input;
                      }}
                      value={values.city}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'home-map-marker'}
                      placeholder="City"
                      onChangeText={handleChange('city')}
                      onBlur={() => setFieldTouched('city')}
                      autoCorrect={false}
                      keyboardType={'email-address'}
                      textContentType={'city'}
                      status={
                        touched.city && errors.city ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.city && errors.city ? errors.city : ''
                      }
                    />

                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('pincode');
                      }}
                      InputRef={input => {
                        this.inputs.state = input;
                      }}
                      value={values.state}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'mapbox'}
                      placeholder="State"
                      onChangeText={handleChange('state')}
                      onBlur={() => setFieldTouched('state')}
                      autoCorrect={false}
                      keyboardType="phone-pad"
                      textContentType={'postalCode'}
                      status={
                        touched.state && errors.state ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.state && errors.state ? errors.state : ''
                      }
                    />
                    <InputCustom
                      InputonSubmitEditing={() => {
                        this.focusTheField('password');
                      }}
                      InputRef={input => {
                        this.inputs.pincode = input;
                      }}
                      value={values.pincode}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'pin'}
                      placeholder="Pin Code"
                      onChangeText={handleChange('pincode')}
                      onBlur={() => setFieldTouched('pincode')}
                      autoCorrect={false}
                      keyboardType={'default'}
                      textContentType={'pincode'}
                      status={
                        touched.pincode && errors.pincode ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.pincode && errors.pincode ? errors.pincode : ''
                      }
                    />

                    <InputCustom
                      InputRef={input => {
                        this.inputs.password = input;
                      }}
                      textContentType={'password'}
                      autoCompleteType={'password'}
                      keyboardType={'default'}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      placeholder={'Password'}
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

                    <View>
                      <ButtonCustom
                        title={'Login'}
                        loading={false}
                        onPre={handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
