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
    KeyboardAvoidingView, StatusBar,
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
  OnLogin = async (values) => {
      this.setState({
          loading:true
      });

      if (await this.props.Auth.CheckOnline() === true && await this.props.Auth.Login(values) === true){

          let userdata = await this.props.User.getUserDetails(this.props.Auth.access_token);

      } else {
          alert('invalid')
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
                      placeholder="Username"
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
                  </View>

                  <View>
                    <ButtonCustom
                      title={'Login'}
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
              <TextPrimary value={'Dont have an account ?'} />
              <ButtonOutline onPress={() => this.props.navigation.navigate('Register')} title={'Register'} />
                <ButtonText onPress={() => this.props.navigation.navigate('ForgotPassword')} title={'Forgot Password'}/>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
