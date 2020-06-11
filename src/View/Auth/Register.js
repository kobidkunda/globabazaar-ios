import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView, Alert,Text
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import {inject, observer} from 'mobx-react';
import {TEXTLLGWHITEVV, TEXTNLBLACKD} from '../../Style/TextStyle';
import {ButtonGroup} from 'react-native-elements';
import {BLUEDARK, WHITE, YELLOW} from '../../Config/theme';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject('Auth')
@observer
export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            langselect: 0,
            lang: 'in_hi'

        };

        this.updateIndex = this.updateIndex.bind(this)

    }

    updateIndex (langselect) {
        this.setState({langselect});
        if (langselect === 0 ){
            this.setState({
                lang: 'in_hi'
            })
        } else if (langselect === 1 ){
            this.setState({
                lang: 'ne'
            })
        }
        else {
            this.setState({
                lang: 'in_hi'
            })
        }
        console.log(langselect)
    }




  OnLogin = async (values,lang) => {
        this.setState({
            loading:true
        })
    console.log(values);
    let POST_DATA = await this.props.Auth.Register(values,lang);

    if (POST_DATA.status.status === 200){
        Alert.alert(
            "Registration Successful",
            "Go back and login to your account",
            [
                {
                    text: "Go back",
                    onPress: () => this.props.navigation.goBack(),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
        this.setState({
            loading:false
        })

    } else {
        Alert.alert(
            "Invalid Data",
            "Check for your Data or your Internet Connection",
            [
                { text: "Try Again", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
        this.setState({
            loading:false
        })
    }

    console.log(POST_DATA);

  };

  inputs = {};
  // function to focus the field
  focusTheField = id => {
    this.inputs[id].focus();
  };

  render() {
      const component1 = () => <TEXTNLBLACKD>Hindi</TEXTNLBLACKD>
      const component2 = () => <TEXTNLBLACKD>Nepali</TEXTNLBLACKD>
      const buttons = [{ element: component1 }, { element: component2 }]
      const { langselect } = this.state
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
                onSubmit={values => this.OnLogin(values,this.state.lang)}
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
                      placeholder={this.props.Auth.langfile.words.fn}
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
                      placeholder={this.props.Auth.langfile.words.ln}
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
                      placeholder={this.props.Auth.langfile.words.em}
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
                      placeholder={this.props.Auth.langfile.words.ph}
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
                      placeholder={this.props.Auth.langfile.words.st}
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
                      placeholder={this.props.Auth.langfile.words.ct}
                      onChangeText={handleChange('city')}
                      onBlur={() => setFieldTouched('city')}
                      autoCorrect={false}
                      keyboardType={'default'}
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
                        this.focusTheField('state');
                      }}
                      InputRef={input => {
                        this.inputs.city = input;
                      }}
                      value={values.city}
                      blurOnSubmit={false}
                      returnKeyType={'next'}
                      leftIcon={'home-map-marker'}
                      placeholder={this.props.Auth.langfile.words.cou}
                      onChangeText={handleChange('city')}
                      onBlur={() => setFieldTouched('city')}
                      autoCorrect={false}
                      keyboardType={'default'}
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
                      placeholder={this.props.Auth.langfile.words.sta}
                      onChangeText={handleChange('state')}
                      onBlur={() => setFieldTouched('state')}
                      autoCorrect={false}
                      keyboardType="default"
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
                      placeholder={this.props.Auth.langfile.words.pn}
                      onChangeText={handleChange('pincode')}
                      onBlur={() => setFieldTouched('pincode')}
                      autoCorrect={false}
                      keyboardType={'phone-pad'}
                      textContentType={'phone'}
                      status={
                        touched.pincode && errors.pincode ? 'danger' : 'primary'
                      }
                      shake={true}
                      errorMessage={
                        touched.pincode && errors.pincode ? errors.pincode : ''
                      }
                    />

                      <View style={{
                          padding:10
                      }}>
                          <TEXTLLGWHITEVV>Preferred Language of Video</TEXTLLGWHITEVV>
                      </View>
                      <ButtonGroup
                          selectedButtonStyle={{
                              backgroundColor:YELLOW,
                              elevation:20
                          }}
                          underlayColor={BLUEDARK}
                          containerStyle={{
                              marginBottom:20
                          }}
                          onPress={this.updateIndex}
                          selectedIndex={langselect}
                          buttons={buttons}

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

                    <View>
                      <ButtonCustom
                        title={this.props.Auth.langfile.words.rgd}
                        loading={this.state.loading}
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
