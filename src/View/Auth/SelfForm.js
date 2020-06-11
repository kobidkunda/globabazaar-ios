import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView, Alert, Modal,Image as Image2
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';
import {inject, observer} from 'mobx-react';
import {TEXTLLGWHITEVV, TEXTNLBLACKD} from '../../Style/TextStyle';
import {BLUEDARK, BLURBACKGROUND, WHITE, YELLOW} from '../../Config/theme';
import Signature  from 'react-native-signature-canvas';
import {Picker} from '@react-native-community/picker';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject('Auth','User')
@observer
export default class SelfForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            signature: null,
            setSign:null,
            model:false,
            signature_base64:null,
            gender:'male',
            financial_status:'poor',
            marital_status:'single',


        };
    }








  OnLogin = async (values,lang) => {
        this.setState({
            loading:true
        })
   // console.log(values);

        let  access_token = await  this.props.Auth.GetToken();

     let kkk = await   this.props.Auth.SendSelfForm(values,
         this.state.signature_base64,
         this.state.gender,
         access_token,
         this.state.financial_status,
         this.state.marital_status,
     )

      console.log(kkk);

     if (kkk.status === 200){
         let checkroute = await this.props.User.getUserDetailsRecheck(access_token);

         let checkroutet = await this.props.User.CheckRoute();
     } else {
         Alert.alert(
             "Invalid Data",
             "Invalid Data Retry Again",
             [
                 { text: 'OK', onPress: () => console.log("OK Pressed") }
             ],
             { cancelable: false }
         );
     }


      this.setState({
          loading:false
      })

  };

  inputs = {};
  // function to focus the field
  focusTheField = id => {
    this.inputs[id].focus();
  };

    handleSignature = signature => {
        this.setState({
            signature: signature,
            signature_base64: signature,
            model:false
        });
    };

    handleEmpty = () => {
        console.log('Empty');
    }

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
              <Image2
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
                        fname: 'test',
                        lname: 'test',
                        email: this.props.User.email,
                        phone: this.props.User.phone,
                        street:this.props.User.street,
                        street2:this.props.User.street,
                        city: this.props.User.city,
                        city2: this.props.User.city,
                        state: this.props.User.state,
                        country: 'Inias',
                        state2: this.props.User.state,
                        pincode: this.props.User.pin_code,
                        pincode2: this.props.User.pin_code,
                        education: 'test blut test jujh',
                        work_experience: 'test blut test jujh',
                        type_of_work: 'test blut test jujh',
                        health_condition: 'test blut test jujh',
                        talent: 'test blut test jujh',
                        whatsapp_id: 'test blut test jujh',
                        why_attend: 'test blut test jujh',
                        what_sponsor_told: 'test blut test jujh',
                        goal_in_life: 'test blut test jujh',
                        sponsor_name: 'test blut test jujh',
                        sponsor_rank: 'test blut test jujh',
                        sponsor_id: 'test blut test jujh',
                        relationship_with_sponsor: 'test blut test jujh',
                        financial_source: 'test blut test jujh',
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
                        country: yup
                            .string()
                            .min(2)
                            .required(),

                        pincode: yup
                            .string()
                            .min(6)
                            .max(6)
                            .matches(/\d{3}[\ ]?\d{3}/, 'Pin code is not valid')
                            .required(),

                        street2: yup
                            .string()
                            .min(5)
                            .required(),
                        city2: yup
                            .string()
                            .min(4)
                            .required(),
                        state2: yup
                            .string()
                            .min(2)
                            .required(),

                        pincode2: yup
                            .string()
                            .min(6)
                            .max(6)
                            .matches(/\d{3}[\ ]?\d{3}/, 'Pin code is not valid')
                            .required(),
                        education: yup
                            .string()
                            .min(6)
                            .required(),
                        work_experience: yup
                            .string()
                            .min(6)
                            .required(),
                        type_of_work: yup
                            .string()
                            .min(6)
                            .required(),
                        health_condition: yup
                            .string()
                            .min(6)
                            .required(),
                        talent: yup
                            .string()
                            .min(6)
                            .required(),
                        whatsapp_id: yup
                            .string()
                            .min(6)
                            .required(),
                        why_attend: yup
                            .string()
                            .min(6)
                            .required(),
                        what_sponsor_told: yup
                            .string()
                            .min(6)
                            .required(),
                        goal_in_life: yup
                            .string()
                            .min(6)
                            .required(),
                        sponsor_name: yup
                            .string()
                            .min(6)
                            .required(),
                        sponsor_rank: yup
                            .string()
                            .min(6)
                            .required(),
                        sponsor_id: yup
                            .string()
                            .min(6)
                            .required(),
                        financial_source: yup
                            .string()
                            .min(6)
                            .required(),
                        relationship_with_sponsor: yup
                            .string()
                            .min(6)
                            .required()
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
                                    this.focusTheField('email');
                                }}
                                InputRef={input => {
                                    this.inputs.phone = input;
                                }}
                                value={values.phone}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'phone'}
                                onChangeText={handleChange('phone')}
                                onBlur={() => setFieldTouched('phone')}
                                autoCorrect={false}
                                keyboardType={'default'}
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
                                    this.focusTheField('work_experience');
                                }}
                                InputRef={input => {
                                    this.inputs.email = input;
                                }}
                                value={values.email}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'email'}
                                placeholder={'Relation With Sponcer'}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                autoCorrect={false}
                                keyboardType={'default'}
                                status={
                                    touched.email && errors.email ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.email && errors.email ? errors.email : ''
                                }
                            />


                            <View
                                style={{
                                    width: WIDTH,
                                    paddingTop: 0,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingBottom: 20,


                                }}>
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={styles.style}
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({   gender:itemValue})
                                    }>
                                    <Picker.Item itemStyle={styles.itemStyle} label="Male" value="male" />
                                    <Picker.Item itemStyle={styles.itemStyle} label="Female" value="female" />
                                </Picker>
                            </View>

                            <View style={{
                                padding:10
                            }}>
                                <TEXTLLGWHITEVV>Permanent Address</TEXTLLGWHITEVV>
                            </View>


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
                                    this.focusTheField('country');
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
                                    this.focusTheField('pincode');
                                }}
                                InputRef={input => {
                                    this.inputs.country = input;
                                }}
                                value={values.country}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Country'}
                                onChangeText={handleChange('country')}
                                onBlur={() => setFieldTouched('country')}
                                autoCorrect={false}
                                keyboardType="default"
                                textContentType={'postalCode'}
                                status={
                                    touched.country && errors.country ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.country && errors.country ? errors.country : ''
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
                                <TEXTLLGWHITEVV>Temporary Address</TEXTLLGWHITEVV>
                            </View>


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('city');
                                }}
                                InputRef={input => {
                                    this.inputs.street2 = input;
                                }}
                                value={values.street2}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'map-marker-minus'}
                                placeholder={this.props.Auth.langfile.words.st}
                                onChangeText={handleChange('street2')}
                                onBlur={() => setFieldTouched('street2')}
                                autoCorrect={false}
                                keyboardType={'default'}
                                textContentType={'street2'}
                                status={
                                    touched.street2 && errors.street2 ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.street2 && errors.street2 ? errors.street2 : ''
                                }
                            />

                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('state');
                                }}
                                InputRef={input => {
                                    this.inputs.city2 = input;
                                }}
                                value={values.city2}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'home-map-marker'}
                                placeholder={this.props.Auth.langfile.words.ct}
                                onChangeText={handleChange('city2')}
                                onBlur={() => setFieldTouched('city2')}
                                autoCorrect={false}
                                keyboardType={'default'}
                                textContentType={'city2'}
                                status={
                                    touched.city2 && errors.city2 ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.city2 && errors.city2 ? errors.city2 : ''
                                }
                            />

                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('pincode');
                                }}
                                InputRef={input => {
                                    this.inputs.state2 = input;
                                }}
                                value={values.state2}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={this.props.Auth.langfile.words.sta}
                                onChangeText={handleChange('state2')}
                                onBlur={() => setFieldTouched('state2')}
                                autoCorrect={false}
                                status={
                                    touched.state2 && errors.state2 ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.state2 && errors.state2 ? errors.state2 : ''
                                }
                            />
                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('education');
                                }}
                                InputRef={input => {
                                    this.inputs.pincode2 = input;
                                }}
                                value={values.pincode2}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'pin'}
                                placeholder={this.props.Auth.langfile.words.pn}
                                onChangeText={handleChange('pincode2')}
                                onBlur={() => setFieldTouched('pincode2')}
                                autoCorrect={false}
                                keyboardType={'default'}
                                textContentType={'phone'}
                                status={
                                    touched.pincode2 && errors.pincode2 ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.pincode2 && errors.pincode2 ? errors.pincode2 : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('work_experience');
                                }}
                                InputRef={input => {
                                    this.inputs.education = input;
                                }}
                                value={values.education}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Qualification'}
                                onChangeText={handleChange('education')}
                                onBlur={() => setFieldTouched('education')}
                                status={
                                    touched.education && errors.education ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.education && errors.education ? errors.education : ''
                                }
                            />

                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('type_of_work');
                                }}
                                InputRef={input => {
                                    this.inputs.work_experience = input;
                                }}
                                value={values.work_experience}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Work Experience'}
                                onChangeText={handleChange('work_experience')}
                                onBlur={() => setFieldTouched('work_experience')}
                                autoCorrect={false}
                                status={
                                    touched.work_experience && errors.work_experience ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.work_experience && errors.work_experience ? errors.work_experience : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('health_condition');
                                }}
                                InputRef={input => {
                                    this.inputs.type_of_work = input;
                                }}
                                value={values.type_of_work}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Type of Work'}
                                onChangeText={handleChange('type_of_work')}
                                onBlur={() => setFieldTouched('type_of_work')}
                                autoCorrect={false}
                                status={
                                    touched.type_of_work && errors.type_of_work ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.type_of_work && errors.type_of_work ? errors.type_of_work : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('talent');
                                }}
                                InputRef={input => {
                                    this.inputs.health_condition = input;
                                }}
                                value={values.health_condition}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Health Condition'}
                                onChangeText={handleChange('health_condition')}
                                onBlur={() => setFieldTouched('health_condition')}
                                autoCorrect={false}
                                status={
                                    touched.health_condition && errors.health_condition ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.health_condition && errors.health_condition ? errors.health_condition : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('whatsapp_id');
                                }}
                                InputRef={input => {
                                    this.inputs.talent = input;
                                }}
                                value={values.talent}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Talent you have?'}
                                onChangeText={handleChange('talent')}
                                onBlur={() => setFieldTouched('talent')}
                                autoCorrect={false}
                                status={
                                    touched.talent && errors.talent ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.talent && errors.talent ? errors.talent : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('why_attend');
                                }}
                                InputRef={input => {
                                    this.inputs.whatsapp_id = input;
                                }}
                                value={values.whatsapp_id}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Whatsapp No'}
                                onChangeText={handleChange('whatsapp_id')}
                                onBlur={() => setFieldTouched('whatsapp_id')}
                                autoCorrect={false}
                                status={
                                    touched.whatsapp_id && errors.whatsapp_id ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.whatsapp_id && errors.whatsapp_id ? errors.whatsapp_id : ''
                                }
                            />

                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('what_sponsor_told');
                                }}
                                InputRef={input => {
                                    this.inputs.why_attend = input;
                                }}
                                value={values.why_attend}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Why attend gb7?'}
                                onChangeText={handleChange('why_attend')}
                                onBlur={() => setFieldTouched('why_attend')}
                                autoCorrect={false}
                                status={
                                    touched.why_attend && errors.why_attend ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.why_attend && errors.why_attend ? errors.why_attend : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('goal_in_life');
                                }}
                                InputRef={input => {
                                    this.inputs.what_sponsor_told = input;
                                }}
                                value={values.what_sponsor_told}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'What sponcer told you?'}
                                onChangeText={handleChange('what_sponsor_told')}
                                onBlur={() => setFieldTouched('what_sponsor_told')}
                                autoCorrect={false}
                                status={
                                    touched.what_sponsor_told && errors.what_sponsor_told ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.what_sponsor_told && errors.what_sponsor_told ? errors.what_sponsor_told : ''
                                }
                            />





                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('sponsor_name');
                                }}
                                InputRef={input => {
                                    this.inputs.goal_in_life = input;
                                }}
                                value={values.goal_in_life}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Goal in your life'}
                                onChangeText={handleChange('goal_in_life')}
                                onBlur={() => setFieldTouched('goal_in_life')}
                                autoCorrect={false}
                                status={
                                    touched.goal_in_life && errors.goal_in_life ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.goal_in_life && errors.goal_in_life ? errors.goal_in_life : ''
                                }
                            /><InputCustom
                            InputonSubmitEditing={() => {
                                this.focusTheField('sponsor_rank');
                            }}
                            InputRef={input => {
                                this.inputs.sponsor_name = input;
                            }}
                            value={values.sponsor_name}
                            blurOnSubmit={false}
                            returnKeyType={'next'}
                            leftIcon={'mapbox'}
                            placeholder={'Sponcor Name'}
                            onChangeText={handleChange('sponsor_name')}
                            onBlur={() => setFieldTouched('sponsor_name')}
                            autoCorrect={false}
                            status={
                                touched.sponsor_name && errors.sponsor_name ? 'danger' : 'primary'
                            }
                            shake={true}
                            errorMessage={
                                touched.sponsor_name && errors.sponsor_name ? errors.sponsor_name : ''
                            }
                        />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('sponsor_id');
                                }}
                                InputRef={input => {
                                    this.inputs.sponsor_rank = input;
                                }}
                                value={values.sponsor_rank}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Sponcor Rank'}
                                onChangeText={handleChange('sponsor_rank')}
                                onBlur={() => setFieldTouched('sponsor_rank')}
                                autoCorrect={false}
                                status={
                                    touched.sponsor_rank && errors.sponsor_rank ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.sponsor_rank && errors.sponsor_rank ? errors.sponsor_rank : ''
                                }
                            />


                            <InputCustom
                                InputonSubmitEditing={() => {
                                    this.focusTheField('relationship_with_sponsor');
                                }}
                                InputRef={input => {
                                    this.inputs.sponsor_id = input;
                                }}
                                value={values.sponsor_id}
                                blurOnSubmit={false}
                                returnKeyType={'next'}
                                leftIcon={'mapbox'}
                                placeholder={'Sponcor ID'}
                                onChangeText={handleChange('sponsor_id')}
                                onBlur={() => setFieldTouched('sponsor_id')}
                                autoCorrect={false}
                                keyboardType="default"
                                status={
                                    touched.sponsor_id && errors.sponsor_id ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.sponsor_id && errors.sponsor_id ? errors.sponsor_id : ''
                                }
                            />


                            <InputCustom
                                InputRef={input => {
                                    this.inputs.relationship_with_sponsor = input;
                                }}
                                value={values.relationship_with_sponsor}
                                blurOnSubmit={false}
                                returnKeyType={'done'}
                                leftIcon={'mapbox'}
                                placeholder={'Relationship with Sponcor'}
                                onChangeText={handleChange('relationship_with_sponsor')}
                                onBlur={() => setFieldTouched('relationship_with_sponsor')}
                                autoCorrect={false}
                                status={
                                    touched.relationship_with_sponsor && errors.relationship_with_sponsor ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.relationship_with_sponsor && errors.relationship_with_sponsor ? errors.relationship_with_sponsor : ''
                                }
                            />



                            <View
                                style={{
                                    width: WIDTH,
                                    paddingTop: 0,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingBottom: 20,


                                }}>
                                <Picker
                                    selectedValue={this.state.marital_status}
                                    style={styles.style}
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({   marital_status:itemValue})
                                    }>
                                    <Picker.Item itemStyle={styles.itemStyle} label="single" value="single" />
                                    <Picker.Item itemStyle={styles.itemStyle} label="married" value="married" />
                                    <Picker.Item itemStyle={styles.itemStyle} label="divorced" value="divorced" />
                                </Picker>
                            </View>


                            <View
                                style={{
                                    width: WIDTH,
                                    paddingTop: 0,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingBottom: 20,


                                }}>
                                <Picker
                                    selectedValue={this.state.financial_status}
                                    style={styles.style}
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({   financial_status:itemValue})
                                    }>
                                    <Picker.Item itemStyle={styles.itemStyle} label="poor" value="poor" />
                                    <Picker.Item itemStyle={styles.itemStyle} label="middle_class" value="middle_class" />
                                    <Picker.Item itemStyle={styles.itemStyle} label="rich" value="rich" />
                                </Picker>
                            </View>



                            <InputCustom
                                InputRef={input => {
                                    this.inputs.financial_source = input;
                                }}
                                value={values.financial_source}
                                blurOnSubmit={false}
                                returnKeyType={'done'}
                                leftIcon={'mapbox'}
                                placeholder={'financial_source'}
                                onChangeText={handleChange('financial_source')}
                                onBlur={() => setFieldTouched('financial_source')}
                                autoCorrect={false}
                                status={
                                    touched.financial_source && errors.financial_source ? 'danger' : 'primary'
                                }
                                shake={true}
                                errorMessage={
                                    touched.financial_source && errors.financial_source ? errors.financial_source : ''
                                }
                            />




                            {this.state.model === true ? (
                                <Modal style={{
                                    height:200,
                                    overflow: 'hidden'
                                }}>
                                    <Signature
                                        onOK={this.handleSignature}
                                        onEmpty={this.handleEmpty}

                                        // description text for signature
                                        descriptionText="Sign"
                                        // clear button text
                                        clearText="Clear"

                                        // save button text
                                        confirmText="Save"
                                        // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
                                        webStyle={`.m-signature-pad--footer
    .button {
      background-color: '#0692d4';
      color: #FFF;
    }`
                                        }
                                        autoClear={true}
                                        //imageType={"image/svg+xml"}
                                         imageType={"image/jpeg"}
                                    />
                                </Modal>
                            ): null}



                            <View style={{ flex: 1 }}>


                                <ButtonCustom
                                    title={'Click to Sign Here'}
                                    onPre={() => this.setState({
                                        model:true
                                    })}
                                />




                            </View>



                            <View>
                                { this.state.signature_base64 !== null ?(
                                    <ButtonCustom
                                        title={'Upload Form & Verify'}
                                        loading={this.state.loading}
                                        onPre={handleSubmit}
                                        // onPre={() => this.handleSubmit}
                                    />
                                ): null}

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

const webStyle = `.m-signature-pad--footer
	.save {
		display: none;
	}
	.clear {
		display: none;
	}
`;
const styles = StyleSheet.create({
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10
    },
        style: {
            borderRadius: 30,
            // backdropFilter: 'blur(33px)',
            backgroundColor: BLURBACKGROUND,
            elevation: 10,
            height:50,
            fontFamily:'MontserratSemiBold',
            textTransform:'uppercase',
            fontSize:16,
            color: WHITE,
        },
        containerStyle: {
            elevation: 10,
        },
        itemStyle: {
            fontSize:16,
            color: WHITE,
            fontFamily:'MontserratSemiBold',
            textTransform:'uppercase'
        },

});
