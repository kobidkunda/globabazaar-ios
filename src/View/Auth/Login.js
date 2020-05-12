import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import InputCustom from '../../Component/InputCustom';
import ButtonCustom from '../../Component/ButtonCustom';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class Login extends Component {
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
        <Grid>
          <Row
            size={50}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 120,
                height: 120,
                  backgroundColor: 'rgba(255,255,255,0.29)',
                  borderRadius:10,
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
          </Row>



          <Row size={10}>

            <InputCustom placeholder={'Username'} />
            
          </Row>
          <Row size={10}>
              <KeyboardAvoidingView>
            <InputCustom placeholder={'Password'} />
              </KeyboardAvoidingView>
          </Row>

          <Row size={40}>
              <ButtonCustom/>
          </Row>
        </Grid>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
